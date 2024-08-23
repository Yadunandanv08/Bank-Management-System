from database import *
class Bank:
    def __init__(self, username, accountNumber):
        self.__username =  username
        self.__accountNumber =  accountNumber

    def createTransactionTable(self):
        query(f"CREATE TABLE IF NOT EXISTS {self.__accountNumber}_Transactions"
              f"(time VARCHAR(40),"
              f"type VARCHAR(20),"
              f"accountNumber INTEGER,"
              F"amount INTEGER)")