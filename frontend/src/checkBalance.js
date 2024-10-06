import React, { useState } from 'react';
import axios from 'axios';
import './checkBalance.css'

const CheckBalance = () => {
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');

    const handleCheckBalance = async () => {
        const username = localStorage.getItem('username');
        try {
            const response = await axios.post('http://localhost:5000/balance', {
                username,
                password
            });

            if (response.data.balance !== undefined) {
                setBalance(response.data.balance);
                setError('');
            } else if (response.data.error) {
                setError(response.data.error);
                setBalance(null);
            }
        } catch (error) {
            setError('Error checking balance');
            setBalance(null);
        }
    };

    return (
        <div className="check-balance-container">
            <h2 className='checkBalanceHeader'>Check Balance</h2>
            <div className="form-group">
                <label className='checkBalanceLabel'>Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="input-field"
                />
            </div>
            <button onClick={handleCheckBalance} className="check-balance-button">
                Check Balance
            </button>

            {balance !== null && (
                <div className="balance-result">
                    <h3>Your Balance: Rs.{balance}</h3>
                </div>
            )}
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default CheckBalance;
