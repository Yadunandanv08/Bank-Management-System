from flask import Flask, request, jsonify # import for flask app
from flask_cors import CORS
from register import signin, signup  
from bank import *  

app = Flask(__name__)
CORS(app)

@app.route('/signup', methods=['POST'])
def signup_route(): # doesnot currently return new account number or create new transaction table, but customer table is being updated.
    try:
        data = request.get_json()  # Get data from the request body
        username = data['username']
        password = data['password']
        age = data['age']
        city = data['city']
        
        signup(username, password, age, city)
        return jsonify({"message": "Signup successful!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# functions below have not been integrated to the frontend. (might encounter errors if executed)

@app.route('/signin', methods=['GET', 'POST'])
def signin_route():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        
        user = signin(username, password)
        if user:
            # Get account number after sign in
            accountNumber = query(f"SELECT accountNumber FROM customers WHERE username = '{username}';")
            return jsonify({"message": "Signin successful", "accountNumber": accountNumber[0][0]}), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/check_balance', methods=['GET', 'POST'])
def check_balance():
    try:
        data = request.get_json()
        username = data['username']
        accountNumber = data['accountNumber']
        
        bobj = Bank(username, accountNumber)
        balance = bobj.checkBalance()
        
        return jsonify({"balance": balance}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/deposit', methods=['GET', 'POST'])
def deposit():
    try:
        data = request.get_json()
        username = data['username']
        accountNumber = data['accountNumber']
        amount = int(data['amount'])
        
        bobj = Bank(username, accountNumber)
        bobj.deposit(amount)
        return jsonify({"message": "Deposit successful"}), 200

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
