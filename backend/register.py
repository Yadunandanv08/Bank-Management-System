from database import *
import random
from customer import *
from bank import Bank

createCustomerTable()

def signup(username, password, age, city):
    temp = query(f"SELECT username FROM customers WHERE username='{username}';")
    
    if temp:
        print("Username already exists")
    else:
        # Generating unique account number
        while True:
            accountNumber = int(random.randint(100000000, 999999999))
            temp = query(f"SELECT accountNumber FROM customers WHERE accountNumber='{accountNumber}';")
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
        bankobj.createTransactionTable()

def signin(username, password):
    temp = query(f"SELECT username FROM customers WHERE username = '{username}';") 
    if temp:
        while True:
            check = query(f"SELECT password FROM customers WHERE username = '{username}';")
            if check[0][0] == password:
                print("logged in successfully!")
                return username
                break
            else:
                print("wrong password!")
    else:
        print("invalid username")
        signin()           