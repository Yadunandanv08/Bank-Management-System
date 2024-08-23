from database import *
import random
from customer import *
from bank import Bank

createCustomerTable()

def signup():
    username = input("create username: ")
    temp=query(f"SELECT username FROM customers WHERE username='{username}';")
    if temp:
        print("Username already exists")
        signup()
    else:
        password = input("enter password: ")
        age = input("enter age: ")
        city = input("enter city: ")
        while True:
            accountNumber = int(random.randint(100000000, 999999999))
            temp=query(f"SELECT accountNumber FROM customers WHERE accountNumber='{accountNumber}';")
            if temp:
                continue
            else:
                print(accountNumber)
                break
    customobj = Customer(username, password, age, city, accountNumber)
    customobj.createUser()
    bankobj = Bank(username, accountNumber)
    bankobj.createTransactionTable()

def signin():
    username = input("enter username: ")
    temp = query(f"SELECT username FROM customers WHERE username = '{username}';") 
    if temp:
        while True:
            password = input("enter password: ")
            check = query(f"SELECT password FROM customers WHERE username = '{username}';")
            if check[0][0] == password:
                print("logged in successfully!")
                break
            else:
                print("wrong password!")
    else:
        print("invalid username")
        signin()           