#Bank Database Management
import mysql.connector as sql

mydb= sql.connect(
    host="localhost",
    user="root",
    password="yadu",
    database="Bank"
)

cursor = mydb.cursor()

def query(query_string):
    cursor.execute(query_string)
    result=cursor.fetchall()
    return result

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
