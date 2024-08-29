from register import *
from bank import *

status = False

while True:
    try:
        reg = int(input("1.Sign Up\n"
                        "2.Sign In\n"))
        if reg == 1:
            signup()
        elif reg == 2:
            user = signin()
            status = True
            break

    except ValueError:
        print("invalid input")

accountNumber = query(f"SELECT accountNumber FROM customers WHERE username = '{user}';")


while status:
    try:
        service = int(input("1.Check Balance\n"
                            "2.Deposit\n"
                            "3.Withdrawal\n"
                            "4.Fund Transfer\n"))
        if service == 1:
            bobj = Bank(user, accountNumber)
            bobj.checkBalance()

        elif service == 2:
            while True:
                try:
                    amount = int(input("Enter Amount: "))
                    bobj = Bank(user, accountNumber[0][0])
                    bobj.deposit(amount)
                    mydb.commit()
                    break
                except ValueError:
                    print("Enter Valid Account Number: ")
                    continue

        elif service == 3:
            while True:
                try:
                    amount = int(input("Enter Amount: "))
                    bobj = Bank(user, accountNumber[0][0])
                    bobj.withdraw(amount)
                    mydb.commit()
                    break
                except ValueError:
                    print("Enter Valid Account Number: ")
                    continue
           
        elif service == 4:
            while True:
                try:
                    reciever = int(input("Enter Reciever Account Number: "))
                    amount = int(input("Enter Amount: "))
                    bobj = Bank(user, accountNumber[0][0])
                    bobj.transfer(amount, reciever)
                    mydb.commit()
                    break
                except ValueError:
                    print("Enter Valid Account Number: ")
                    continue

    except ValueError:
        print("invalid input")