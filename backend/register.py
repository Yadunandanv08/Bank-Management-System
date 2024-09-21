from database import *
import random          # import of random function for generating account number.
from customer import *
from bank import Bank  # for bank object and transaction table

# Create customer table if it doesnt already exist("CREATE TABLE IF NOT EXIST(...)" query in database.py)
createCustomerTable() 

# signUp function for registering new user.
def signup(username, password, age, city):
    # temp checks if new registering username already exists in the database.
    temp = query(f"SELECT username FROM customers WHERE username='{username}';")
    if temp:
        print("Username already exists")
    else:
        while True:
            accountNumber = int(random.randint(100000000, 999999999))  #generates a random 9 digit account number.
            temp = query(f"SELECT accountNumber FROM customers WHERE accountNumber='{accountNumber}';") # temp to check if accountNumber is uneque
            if temp:
                continue
            else:
                print("Your Account Number: ", accountNumber)
                break

        # new customer object and user
        customobj = Customer(username, password, age, city, accountNumber)
        customobj.createUser()
        
        # new bank object and transaction table
        bankobj = Bank(username, accountNumber)
        bankobj.createTransactionTable() # To create new transaction table for new user(every user has a transaction table for sting all his transactions). 


# signIn function for existing user.
def signin(username, password):
    temp = query(f"SELECT username FROM customers WHERE username = '{username}';") # temp to check if user exists
    if temp:
        while True:
            check = query(f"SELECT password FROM customers WHERE username = '{username}';") # check to verify password of user
            if check[0][0] == password:
                print("logged in successfully!")
                return username
                break
            else:
                print("wrong password!")
    else:
        print("invalid username")
        signin(username, password)           