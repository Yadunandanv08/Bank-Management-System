# functions here might be updated to accomodate frontend integration.

from database import *
import datetime        # import datetime to update transaction time for each transaction of user.
import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',        # Database host
        user='root',             # Database user
        password='yadu',         # Database password
        database='Bank',         # Database name
        autocommit=False         # Ensure autocommit is disabled so you can manually commit transactions
    )



class Bank:
    def __init__(self, username, accountNumber):
        self.__username =  username
        self.__accountNumber =  accountNumber

    # function to create transactions table for each new customer.
    def createTransactionTable(self): 
        sanitized_username = self.__username.replace(" ", "_") # replaces whitespaces in the username with "_" to create transaction table name.
        query(f"CREATE TABLE IF NOT EXISTS {sanitized_username}_Transactions"
              f"(time VARCHAR(40),"
              f"type VARCHAR(100),"
              f"to_acc VARCHAR(100),"
              f"from_acc VARCHAR(100),"
              f"accountNumber INTEGER,"
              f"amount INTEGER)")
        
    # function to check balance
    def checkBalance(self):
        temp = query(f"SELECT balance FROM customers WHERE username = '{self.__username}';")
        if temp:
            return temp[0][0] 
        else:
            return None 
        

    def deposit(self, amount):
        connection = get_db_connection()  # Get connection to the database
        cursor = connection.cursor()

        try:
            # Retrieve current balance
            cursor.execute(f"SELECT balance FROM customers WHERE username = %s;", (self.__username,))
            temp = cursor.fetchone()

            if temp is None:
                raise ValueError("User not found")

            # Update balance
            newbal = amount + temp[0]
            cursor.execute(f"UPDATE customers SET balance = %s WHERE username = %s;", (newbal, self.__username))

            # Commit the changes to the database
            connection.commit()

            # Display updated balance
            print(f"{self.__username} Balance is {newbal}")

            # Update transaction table
            sanitized_username = self.__username.replace(" ", "_")  # For transaction table name
            cursor.execute(f"INSERT INTO {sanitized_username}_Transactions (time, type, to_acc, from_acc, accountNumber, amount) "
                        f"VALUES (%s, 'Deposit', 'NULL', 'NULL', %s, %s);",
                        (datetime.datetime.now(), self.__accountNumber, amount))

            # Commit transaction record
            connection.commit()

            print("Deposit Successful!\n")

        except Exception as e:
            connection.rollback()  # Roll back any changes in case of an error
            print(f"Error during deposit: {e}")

        finally:
            cursor.close()  # Close cursor
            connection.close()  # Close connection

        
    # function to withdraw money
    def withdraw(self, amount):
        temp = query(f"SELECT balance FROM customers WHERE username = '{self.__username}';")
        # if withdraw amaount > balance
        if amount>temp[0][0]:
            print("Insufficient Balance")
        else:
            newbal = temp[0][0] - amount
            query(f"UPDATE customers SET balance = '{newbal}' WHERE username = '{self.__username}';")
            self.checkBalance()
            sanitized_username = self.__username.replace(" ", "_")
            # update transaction table.
            query(f"INSERT INTO {sanitized_username}_Transactions VALUES ("
                f"'{datetime.datetime.now()}',"
                f"'Withdrawal',"
                f"'NULL',"
                f"'NULL',"
                f"'{self.__accountNumber}',"
                f"'{amount}'"
                f")")
            print("Withdrawal Successfull!\n")

    # function to transfer funds.
    def transfer(self, amount, reciever):
        temp = query(f"SELECT balance FROM customers WHERE username = '{self.__username}';")
        if amount > temp[0][0]:
            print("Insufficient Balance")
        else:
            temp2 = query(f"SELECT balance FROM customers WHERE accountNumber = '{reciever}';")
            newbal1 = temp[0][0] - amount
            newbal2 = temp2[0][0] + amount
            query(f"UPDATE customers SET balance = '{newbal1}' WHERE username = '{self.__username}';") # update balance of sender.
            query(f"UPDATE customers SET balance = '{newbal2}' WHERE accountNumber = '{reciever}';")   # update balance of reciever.
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

            # Insert transaction records to sender transaction table.
            query(f"INSERT INTO {sanitized_username}_Transactions VALUES ("
                f"'{datetime.datetime.now()}',"
                f"'{type1}',"
                f"'{reciever}',"
                f"'Self',"
                f"'{self.__accountNumber}',"
                f"'{amount}'"
                f")")
            # Insert transaction records to reciever transaction table.
            query(f"INSERT INTO {sanitized_reciever}_Transactions VALUES ("
                f"'{datetime.datetime.now()}',"
                f"'{type2}',"
                f"'Self',"
                f"'{self.__accountNumber}',"
                f"'{self.__accountNumber}',"
                f"'{amount}'"
                f")")
            print("Transaction Successful!\n")

    