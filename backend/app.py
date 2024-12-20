from flask import Flask, request, jsonify # import for flask app
from flask_cors import CORS
from register import signin, signup  
from bank import *  

app = Flask(__name__)
CORS(app)

@app.route('/signup', methods=['POST'])
def signup_route(): 
    try:
        data = request.get_json()  # Get data from the request body
        username = data['username']
        password = data['password']
        age = data['age']
        city = data['city']
        
        # Call the signup function
        account_number, message = signup(username, password, age, city)
        
        if account_number is None:
            # If the account number is None, it means the username already exists
            return jsonify({"error": message}), 400
        
        # If successful, return the account number
        return jsonify({
            "message": message,
            "account_number": account_number
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/signin', methods=['POST'])
def signin_route():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        
        # Call to signin function to verify user credentials
        result = signin(username, password)  # Use the result from signin
        
        if result['status'] == 'success':
            # Get account number after successful sign in
            accountNumber = query(f"SELECT accountNumber FROM customers WHERE username = '{username}';")
            return jsonify({"message": "Signin successful", "accountNumber": accountNumber[0][0]}), 200
        
        elif result['status'] == 'wrong_password':
            return jsonify({"error": "Wrong password"}), 401
        
        elif result['status'] == 'invalid_username':
            return jsonify({"error": "Invalid username"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/customer_details', methods=['GET'])
def get_customer_details():
    try:
        username = request.args.get('username')  
        account_number = request.args.get('accountNumber')  
        
        if not username or not account_number:
            return jsonify({"error": "Username and account number are required"}), 400

        # Query to get customer details
        customer = query(f"SELECT * FROM customers WHERE username = '{username}' AND accountNumber = '{account_number}';")
        
        if customer:
            customer_data = {
                "name": customer[0][0],
                "age": customer[0][2], 
                "city": customer[0][3], 
                "accountNumber": customer[0][4],  
                "balance": customer[0][4]  
            }
            return jsonify(customer_data), 200
        else:
            return jsonify({"error": "Customer not found"}), 404

    except Exception as e:
        print(f"Error occurred: {e}")  
        return jsonify({"error": "An error occurred while fetching customer details."}), 500

# functions below have not been integrated to the frontend. (might encounter errors if executed)

@app.route('/deposit', methods=['POST'])
def deposit():
    try:
        data = request.get_json()

        # check if data has been entered into the required sections
        if 'username' not in data or 'accountNumber' not in data or 'amount' not in data:
            return jsonify({"error": "Missing required data"}), 400
        
        username = data['username']
        accountNumber = data['accountNumber']

        # Ensure amount is a valid integer
        try:
            amount = int(data['amount'])
            if amount <= 0:
                return jsonify({"error": "Deposit amount must be greater than zero"}), 400
        except ValueError:
            return jsonify({"error": "Invalid amount provided"}), 400

        # Perform deposit operation
        bobj = Bank(username, accountNumber)
        bobj.deposit(amount)

        # Retrieve and return updated balance
        updated_balance = bobj.checkBalance()  # return the current balance
        if updated_balance is not None:
            return jsonify({
                "message": "Deposit successful",
                "updated_balance": updated_balance
            }), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/withdraw', methods=['GET', 'POST'])
def withdraw():
    try:
        data = request.get_json()
        username = data['username']
        accountNumber = data['accountNumber']
        amount = int(data['amount'])
        password = data['password']
        
        user_data = query(f"SELECT password, balance, accountNumber FROM customers WHERE username = '{username}';")
        
        # Validate username and password
        if not user_data or user_data[0][0] != password:    # if user doesnt exist or wrong password
            return jsonify({"error": "Invalid username or password"}), 401

        bobj = Bank(username, accountNumber)
        bobj.withdraw(amount)
        return jsonify({"message": "Withdrawal successful"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/transfer', methods=['POST'])
def transfer():
    try:
        data = request.get_json()

        # recieve inputs from the fields
        username = data['username']
        receiver_account = data['receiver_account']
        amount = data['amount']
        password = data['password']

        # check if data has been entered into the required sections
        if not all([username, receiver_account, amount, password]):
            return jsonify({"error": "Missing required fields"}), 400

        try:
            amount = int(amount)
            if amount <= 0:     # verify amount>0
                return jsonify({"error": "Amount must be a positive number"}), 400
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid amount format"}), 400

        # Fetch user data for validation
        user_data = query(f"SELECT password, balance, accountNumber FROM customers WHERE username = '{username}';")
        
        # Validate username and password
        if not user_data or user_data[0][0] != password:    # if user doesnt exist or wrong password
            return jsonify({"error": "Invalid username or password"}), 401

        balance = user_data[0][1]
        if amount > balance:    # check if transfer amount > balance
            return jsonify({"error": "Insufficient balance"}), 400

        # Check receiver account
        receiver_data = query(f"SELECT balance FROM customers WHERE accountNumber = '{receiver_account}';")
        if not receiver_data:
            return jsonify({"error": "Receiver account not found"}), 404

        # Initialize Bank object and perform transfer
        bobj = Bank(username, user_data[0][2])  
        bobj.transfer(amount, receiver_account)

        return jsonify({"message": "Transfer successful"}), 200

    except Exception as e:
        app.logger.error(f"Error during transfer: {str(e)}")  
        return jsonify({"error": "An error occurred during the transfer"}), 500

@app.route('/balance', methods=['POST'])
def check_balance():
    data = request.json
    username = data['username']
    password = data['password']

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user_exists = query(f"SELECT * FROM customers WHERE username = '{username}' AND password = '{password}';")

    if not user_exists:
        return jsonify({'error': 'Invalid username or password'}), 403

    # Fetch balance
    balance = query(f"SELECT balance FROM customers WHERE username = '{username}';")
    if balance:
        return jsonify({'balance': balance[0][0]}), 200
    else:
        return jsonify({'error': 'Balance not found'}), 404
    
@app.route('/transactions', methods=['GET'])
def get_transactions():
    try:
        username = request.args.get('username')
        if not username:
            return jsonify({"error": "Username is required"}), 400
        
        sanitized_username = username.replace(" ", "_")
        transactions = query(f"SELECT time, type, to_acc, from_acc, accountNumber, amount FROM {sanitized_username}_Transactions")

        if transactions:
            transaction_list = [
                {
                    "time": txn[0],  
                    "type": txn[1],  
                    "to_acc": txn[2],  
                    "from_acc": txn[3],  
                    "accountNumber": txn[4],  
                    "amount": txn[5]  
                }
                for txn in transactions
            ]
            return jsonify(transaction_list), 200
        else:
            return jsonify({"message": "No transactions found"}), 404
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
