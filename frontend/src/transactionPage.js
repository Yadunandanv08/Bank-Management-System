import React, { useState } from 'react';
import axios from 'axios';
import './transactionPage.css';

const FundTransfer = () => {
    const [amount, setAmount] = useState('');
    const [receiverAccount, setReceiverAccount] = useState('');  
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleTransfer = async (e) => {
        e.preventDefault();
        const username = localStorage.getItem('username');

        try {
            const response = await axios.post('/transfer', {
                username: username, 
                amount: parseFloat(amount),
                receiver_account: receiverAccount, 
                password,
            });

            setMessage(response.data.message || "Transaction Successful");
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Error during transaction";
            console.error(errorMessage);
            setMessage(errorMessage);
        }
    };

    return (
        <div className="fund-transfer-container">
            <h2 className="fund-transfer-header">Fund Transfer</h2>
            <form className="fund-transfer-form" onSubmit={handleTransfer}>
                <div className="fund-transfer-input-group">
                    <label className="fund-transfer-label">Receiver Account Number:</label>
                    <input
                        type="text"
                        className="fund-transfer-input"
                        value={receiverAccount}
                        onChange={(e) => setReceiverAccount(e.target.value)}  
                        required
                    />
                </div>
                <div className="fund-transfer-input-group">
                    <label className="fund-transfer-label">Amount:</label>
                    <input
                        type="number"
                        className="fund-transfer-input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="fund-transfer-input-group">
                    <label className="fund-transfer-label">Password:</label>
                    <input
                        type="password"
                        className="fund-transfer-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="fund-transfer-button">Transfer Funds</button>
            </form>
            {message && <p className="fund-transfer-message">{message}</p>}
        </div>
    );
};

export default FundTransfer;
