from database import *
import random          # import of random function for generating account number.
from customer import *
from bank import Bank  # for bank object and transaction table

# Create customer table if it doesnt already exist("CREATE TABLE IF NOT EXIST(...)" query in database.py)
createCustomerTable() 

# signUp function for registering new user.
def signup(username, password, age, city):
    # Check if the username already exists in the database.
    temp = query(f"SELECT username FROM customers WHERE username='{username}';")
    if temp:
        # Return a specific message if the username exists
        return None, "Username already exists"
    
    # Generate a unique account number
    while True:
        accountNumber = random.randint(100000000, 999999999)  # Generates a random 9-digit account number
        temp = query(f"SELECT accountNumber FROM customers WHERE accountNumber='{accountNumber}';")  # Check if accountNumber is unique
        if not temp:
            print("Your Account Number: ", accountNumber)
            break

    # Create new customer object and user
    customobj = Customer(username, password, age, city, accountNumber)
    customobj.createUser()
    
    # Create a new bank object and transaction table
    bankobj = Bank(username, accountNumber)
    bankobj.createTransactionTable()  # Create new transaction table for the new user

    # Return the new account number and a success message
    return accountNumber, "Signup successful!"


# signIn function for existing user.
def signin(username, password):
    temp = query(f"SELECT username FROM customers WHERE username = '{username}';")  # temp to check if user exists
    if temp:
        check = query(f"SELECT password FROM customers WHERE username = '{username}';")  # check to verify password of user
        if check[0][0] == password:
            print("Logged in successfully!")
            return {"status": "success", "username": username}
        else:
            print("Wrong password!")
            return {"status": "wrong_password"}
    else:
        print("Invalid username")
        return {"status": "invalid_username"}

