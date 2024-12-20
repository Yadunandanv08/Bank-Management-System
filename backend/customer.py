#customer details
from database import *

# Defining customer class for creating customer object.
class Customer:
    def __init__(self, username, password, age, city, accountNumber):
        self.__username = username
        self.__password = password
        self.__age = age
        self.__city = city
        self.__accountNumber = accountNumber

    # CreateUser function which updates the customers table when new user object is created.
    def createUser(self): 
        try:
            query = '''
                INSERT INTO customers (username, password, age, city, accountNumber, balance, status) 
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            '''
            values = (self.__username, self.__password, self.__age, self.__city, self.__accountNumber, 0, 1)
            cursor.execute(query, values)
            mydb.commit()
        except Exception as e:
            print(f"Error creating user: {e}")
