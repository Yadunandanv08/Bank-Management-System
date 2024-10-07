import React, { useEffect, useState } from "react";
import axios from "axios";
import './viewTransactions.css'

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    const username = localStorage.getItem("username"); 

    if (!username) {
      setError("Username not found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("/transactions", {
        params: { username }, // Include the username as a query parameter
      });
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to fetch transactions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="transactionHeader">Transactions</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>To Account</th>
            <th>From Account</th>
            <th>Account Number</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.time}</td>
                <td>{transaction.type}</td>
                <td>{transaction.to_acc}</td>
                <td>{transaction.from_acc}</td>
                <td>{transaction.accountNumber}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
