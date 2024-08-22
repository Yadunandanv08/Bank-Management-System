from register import *
while True:
    try:
        reg = int(input("1.signup\n"
                        "2.signin"))
        if reg == 1:
            signup()
        elif reg == 2:
            signin()

    except ValueError:
        print("invalid input")