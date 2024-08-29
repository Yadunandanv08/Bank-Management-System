from database import *
import datetime

class Bank:
    def __init__(self, username, accountNumber):
        self.__username =  username
        self.__accountNumber =  accountNumber

    def createTransactionTable(self):
        sanitized_username = self.__username.replace(" ", "_")
        query(f"CREATE TABLE IF NOT EXISTS {sanitized_username}_Transactions"
              f"(time VARCHAR(40),"
              f"type VARCHAR(100),"
              f"to_acc VARCHAR(100),"
              f"from_acc VARCHAR(100),"
              f"accountNumber INTEGER,"
              f"amount INTEGER)")

    def checkBalance(self):
        temp = query(f"SELECT balance FROM customers WHERE username = '{self.__username}';")
        print(f"{self.__username} Balance is {temp[0][0]}")
    
    def deposit(self, amount):
        temp = query(f"SELECT balance FROM customers WHERE username = '{self.__username}';")
        newbal = amount + temp[0][0]
        query(f"UPDATE customers SET balance = '{newbal}' WHERE username = '{self.__username}';")
        self.checkBalance()
        sanitized_username = self.__username.replace(" ", "_")
        query(f"INSERT INTO {sanitized_username}_Transactions VALUES ("
              f"'{datetime.datetime.now()}',"
              f"'Deposit',"
              f"'NULL',"
              f"'NULL',"
              f"'{self.__accountNumber}',"
              f"'{amount}'"
              f")")
        print("Deposit Successfull!\n")
        
    def withdraw(self, amount):
        temp = query(f"SELECT balance FROM customers WHERE username = '{self.__username}';")
        if amount>temp[0][0]:
            print("Insufficient Balance")
        else:
            newbal = temp[0][0] - amount
            query(f"UPDATE customers SET balance = '{newbal}' WHERE username = '{self.__username}';")
            self.checkBalance()
            sanitized_username = self.__username.replace(" ", "_")
            query(f"INSERT INTO {sanitized_username}_Transactions VALUES ("
                f"'{datetime.datetime.now()}',"
                f"'Withdrawal',"
                f"'NULL',"
                f"'NULL',"
                f"'{self.__accountNumber}',"
                f"'{amount}'"
                f")")
            print("Withdrawal Successfull!\n")

    def transfer(self, amount, reciever):
        temp = query(f"SELECT balance FROM customers WHERE username = '{self.__username}';")
        if amount > temp[0][0]:
            print("Insufficient Balance")
        else:
            temp2 = query(f"SELECT balance FROM customers WHERE accountNumber = '{reciever}';")
            newbal1 = temp[0][0] - amount
            newbal2 = temp2[0][0] + amount
            query(f"UPDATE customers SET balance = '{newbal1}' WHERE username = '{self.__username}';")
            query(f"UPDATE customers SET balance = '{newbal2}' WHERE accountNumber = '{reciever}';")
            recieverUsername = query(f"SELECT username FROM customers WHERE accountNumber = '{reciever}';")
            self.checkBalance()
            
            sanitized_username = self.__username.replace(" ", "_")
            recieverUsername = recieverUsername[0][0]
            sanitized_reciever = recieverUsername.replace(" ", "_")
        
            # Prepare type strings
            type1 = f'Fund Transfer to {reciever}'
            type2 = f'Fund Transfer from {self.__accountNumber}'
            
            # Define maximum length based on your column definition
            max_length = 100  # Adjust this to match the column's length if different
            
            # Truncate type strings if they exceed maximum length
            type1 = type1[:max_length]
            type2 = type2[:max_length]

            # Insert transaction records
            query(f"INSERT INTO {sanitized_username}_Transactions VALUES ("
                f"'{datetime.datetime.now()}',"
                f"'{type1}',"
                f"'{reciever}',"
                f"'Self',"
                f"'{self.__accountNumber}',"
                f"'{amount}'"
                f")")
            query(f"INSERT INTO {sanitized_reciever}_Transactions VALUES ("
                f"'{datetime.datetime.now()}',"
                f"'{type2}',"
                f"'Self',"
                f"'{self.__accountNumber}',"
                f"'{self.__accountNumber}',"
                f"'{amount}'"
                f")")
            print("Transaction Successful!\n")

    
    # def transfer(self, amount, reciever):
    #     temp = query(f"SELECT balance FROM customers WHERE username = '{self.__username}';")
    #     if amount>temp[0][0]:
    #         print("Insufficient Balance")
    #     else:
    #         temp2 = query(f"SELECT balance FROM customers WHERE accountNumber = '{reciever}';")
    #         newbal1 = temp[0][0] - amount
    #         newbal2 = temp[0][0] + amount
    #         query(f"UPDATE customers SET balance = '{newbal1}' WHERE username = '{self.__username}';")
    #         query(f"UPDATE customers SET balance = '{newbal2}' WHERE accountNumber = '{reciever}';")
    #         recieverUsername = query(f"SELECT username FROM customers WHERE accountNumber = '{reciever}';")
    #         self.checkBalance()
    #         sanitized_username = self.__username.replace(" ", "_")
    #         query(f"INSERT INTO {sanitized_username}_Transactions VALUES ("
    #             f"'{datetime.datetime.now()}',"
    #             f"'Fund Transfer to {reciever}',"
    #             f"'{self.__accountNumber}',"
    #             f"'{amount}'"
    #             f")")
    #         query(f"INSERT INTO {recieverUsername[0][0]}_Transactions VALUES ("
    #             f"'{datetime.datetime.now()}',"
    #             f"'Fund Transfer from {self.__accountNumber}',"
    #             f"'{self.__accountNumber}',"
    #             f"'{amount}'"
    #             f")")
    #         print("Transaction Successfull!\n")