import React, { useState } from 'react';
import axios from 'axios';
import './depositPage.css';

const DepositPage = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  const handleDepositSubmit = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/deposit', {
        username: localStorage.getItem('username'),
        accountNumber: localStorage.getItem('accountNumber'),
        amount: parseFloat(amount),
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setMessage('Deposit successful!');
        setBalance(response.data.updated_balance);
        setAmount('');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Deposit failed. Please try again.');
      } else {
        setMessage('Deposit failed due to a server error!');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='depositPage'>
      <div className='depositHeader'>
        <h2>Deposit Funds</h2>
      </div>
      <div className='depositContent'>
        <div className='form-group'>
          <label className='depositLabel'>Amount to Deposit:</label>
          <input
            className='depositInput'
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
          />
        </div>
        <div className='form-group'>
          <button className='depositButton' onClick={handleDepositSubmit} disabled={loading || !amount}>
            {loading ? 'Processing...' : 'Deposit'}
          </button>
        </div>
      </div>
      {message && <p className={message.includes('successful') ? 'success-message' : 'error-message'}>{message}</p>}
      {balance !== null && <p>Updated Balance: {balance}</p>}
    </div>
  );
};

export default DepositPage;
