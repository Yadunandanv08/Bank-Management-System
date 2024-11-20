
# Banking Management System

The purpose of this document is to present a detailed description of the Bank Management System, developed as part of a semester 5 DBMS mini project. This system is designed to replicate the core functionalities of a modern banking system, including managing customer accounts, facilitating transactions, and maintaining secure records.

This document outlines the system's functions, features, interfaces, and objectives, as well as the limitations under which it operates and its expected behavior in response to external interactions. It is intended for system developers and stakeholders, serving as a guide for evaluating the system’s design, implementation, and functionality within the academic context.

The Bank Management System aims to provide a simplified yet effective solution for managing banking operations within the scope of an educational project. Compared to traditional paper-based banking management, this system demonstrates the advantages of maintaining digital records, which can be accessed and updated seamlessly based on user privileges.

While it does not replicate a full-scale banking solution, the system offers insights into the principles of secure, efficient, and user-friendly banking operations. As online systems become increasingly vital for modern banking, this project serves as a hands-on introduction to building and managing such systems.


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment](#environment)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- **Account Management:**  Enables secure creation and deletion of user accounts with data validation.
- **Fund Transfers:** Facilitates money transfers between accounts without requiring the sender's account number.
- **Deposit and Withdrawal Operations:** Allows users to efficiently deposit and withdraw funds, with real-time balance updates.
- **Transaction History Tracking:** Maintains detailed records of all transactions for easy reference.
- **Intuitive User Interface:** Provides a responsive React.js front-end for interaction with the system, powered by a Python Flask backend and a MySQL database.
  
## Installation

To install the Banking Manangement System, follow these steps:

1. Clone the repository:
   ```sh
   git clone https: https://github.com/Yadunandanv08/Bank-Management-System.git
   ```
2. Navigate to the project directory:
  ```sh
  cd backend
```
3. Install the required dependencies:
  ```sh
  pip install -r requirements.txt
```
 
 
## Environment
   The Banking Mangement System can be run on various environments. Below are the recommended specifications:

Operating System: Windows 10 or above

Python Version: 3.8 or above

Required Packages: Listed in requirements.txt

Hardware Requirements:

Processor: Intel i3 or equivalent

RAM: 4GB or more

Storage: 500MB of free space

## Usage
To run the Banking Management System, use the following commands:

backend:
```sh
cd backend
```
```sh
python app.py
```
frontend:
```sh
cd frontend
```
```sh
npm start
```
As a prerequisite, update the database.py file with your system's username and password, and ensure that a MySQL database named 'Bank' is created.

## Contributing
We welcome contributions from the community! To contribute, follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature-branch).

Make your changes and commit them (git commit -m 'Add new feature').

Push to the branch (git push origin feature-branch).

Create a new Pull Request.

Please ensure your code follows our code of conduct and contribution guidelines.

## Contact
If you have any questions or suggestions, feel free to reach out to the project maintainers:

Email - yadunandanv08@gmail.com

vinayc.11b.kmbvm@gmail.com

vvswathi63@gmail.com
        

   
