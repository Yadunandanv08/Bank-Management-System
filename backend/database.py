#Bank Database Management

import mysql.connector as sql 

# connecting the app to the local databse (change the values of password and database accordingly).
mydb= sql.connect(  
    host="localhost",
    user="root",
    password="vinay2004",
    database="Bank"
)

cursor = mydb.cursor()

# query processing function:
def query(query_string):
    cursor.execute(query_string)
    result=cursor.fetchall()
    return result

# Creating the initial customer table.
# This table is created once and is updated for each new user.
# The function call is made in regsiter.py.
def createCustomerTable():
    cursor.execute(''' 
            CREATE TABLE IF NOT EXISTS customers (
            username VARCHAR(20) NOT NULL,
            password VARCHAR(20) NOT NULL,
            age INTEGER,
            city VARCHAR(20),
            accountNumber INTEGER PRIMARY KEY,
            balance INTEGER NOT NULL,
            status TINYINT(1)
        )
    ''')

mydb.commit()

if __name__ == "__main__":
    createCustomerTable()
