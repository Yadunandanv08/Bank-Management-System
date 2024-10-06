import React, { useState } from 'react';
import axios from 'axios';
import './withdrawPage.css';

const WithdrawPage = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);
  const [password, setPassword] = useState(null);

  const handleWithdrawSubmit = async () => {
    setLoading(true);
    setMessage(''); // Clear previous messages
    try {
      const response = await axios.post('http://127.0.0.1:5000/withdraw', {
        username: localStorage.getItem('username'), // Fetch from localStorage
        accountNumber: localStorage.getItem('accountNumber'), // Fetch from localStorage
        amount: parseFloat(amount),
        password // Ensure it's a number
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        setMessage('Withdraw successful!');
        setBalance(response.data.updated_balance); // Set updated balance(current set balance doesnot give accurate balance and prints the previous balance!)
        setAmount(''); // Clear the input field after a successful deposit
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Withdraw failed. Please try again.');
      } else {
        setMessage('Withdraw failed due to a server error!');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='WithdrawPage'>
      <h2 className='WithdrawHeader'>Withdraw Funds</h2>
      <div className='WithdrawContent'>
        <label className='WithdrawLabel'>Amount to Withdraw:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1" // Ensure the amount is always positive
        />
        <label className='WithdrawLabel'>Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="input-field"
                />
        <button className='WithdrawButton' onClick={handleWithdrawSubmit} disabled={loading || !amount}>
          {loading ? 'Processing...' : 'Withdraw'}
        </button>
      </div>
      {message && <p>{message}</p>}
      {balance !== null && <p>Updated Balance: {balance}</p>}
    </div>
  );
};

export default WithdrawPage;