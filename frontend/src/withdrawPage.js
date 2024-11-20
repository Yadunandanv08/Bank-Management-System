import React, { useState } from 'react';
import axios from 'axios';
import './withdrawPage.css';

const WithdrawPage = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);
  const [password, setPassword] = useState('');

  const handleWithdrawSubmit = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/withdraw', {
        username: localStorage.getItem('username'),
        accountNumber: localStorage.getItem('accountNumber'),
        amount: parseFloat(amount),
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        setMessage('Withdraw successful!');
        setBalance(response.data.updated_balance);
        setAmount('');
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
          className='withdraw-amount'
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
        />
        <label className='WithdrawLabel'>Password:</label>
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
      {message && <p className={message.includes('failed') ? 'error-message' : 'success-message'}>{message}</p>}
      {balance !== null && <p>Updated Balance: Rs.{balance}</p>}
    </div>
  );
};

export default WithdrawPage;
