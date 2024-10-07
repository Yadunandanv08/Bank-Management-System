import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customerHomePage.css';  
import { useNavigate } from 'react-router-dom';
import profile from './images/profile.png'

const CustomerHomePage = () => {
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      const username = localStorage.getItem('username');
      const accountNumber = localStorage.getItem('accountNumber');
      
      if (!username || !accountNumber) {
        setError('User not logged in. Please sign in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:5000/customer_details', {
          params: {
            username: username,
            accountNumber: accountNumber
          }
        });
        setCustomerData(response.data);
      } catch (error) {
        setError('Failed to load customer details. Please try again.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('accountNumber');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="customer-home-page">
      <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>Menu</h2>
        <button onClick={() => navigate('/deposit')} className="action-btn">Deposit</button>
        <button onClick={() => navigate('/withdraw')} className="action-btn">Withdraw</button>
        <button onClick={() => navigate('/balance')} className="action-btn">Check Balance</button>
        <button onClick={() => navigate('/transfer')} className="action-btn">Fund Transfer</button>
        <button onClick={() => navigate('/transactions')} className="action-btn">View Transactions</button>
      </div>
      
      <div className={`main-content ${isOpen ? 'shrink' : ''}`}>
        <div className="profile-container">
          <img src={profile} alt='' className="profile-pic" />
          <div className="profile-details">
            <h1>{customerData.name}</h1>
            <p>Account Number: {customerData.accountNumber}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default CustomerHomePage;
