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
        # Parse JSON data
        data = request.get_json()

        # Validate required fields
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
        updated_balance = bobj.checkBalance()  # This will now return the current balance
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
        
        bobj = Bank(username, accountNumber)
        bobj.withdraw(amount)
        return jsonify({"message": "Withdrawal successful"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/transfer', methods=['GET', 'POST'])
def transfer():
    try:
        data = request.get_json()
        username = data['username']
        accountNumber = data['accountNumber']
        receiver_account = data['receiver_account']
        amount = int(data['amount'])
        
        bobj = Bank(username, accountNumber)
        bobj.transfer(amount, receiver_account)
        return jsonify({"message": "Transfer successful"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
