import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customerHomePage.css';  
import { useNavigate } from 'react-router-dom';
import profile from './images/profile.png';
import withdrawImage from './images/withdraw.png';
import depositImage from './images/deposit.png';
import checkBalanceImg from './images/balance.png';
import transactionImg from './images/transaction.png';
import viewTransactionsImg from './images/view.png';


const CustomerHomePage = () => {
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // For sidebar state

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch customer data from localStorage
    const fetchCustomerData = async () => {
      const username = localStorage.getItem('username');
      const accountNumber = localStorage.getItem('accountNumber');
      const age = localStorage.getItem('age');
      const city = localStorage.getItem('city');
      
      if (!username || !accountNumber) {
        setError('User not logged in. Please sign in again.');
        setLoading(false);
        return;
      }

      try {
        // Fetching data from the backend
        const response = await axios.get('http://127.0.0.1:5000/customer_details', {
          params: {
            username,
            accountNumber,
            age,
            city
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

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('accountNumber');
    navigate('/');
  };

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };

  // Show loading screen
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if an error occurs
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="customer-home-page">
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar Navigation */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>Menu</h2>
        <button onClick={() => navigate('/deposit')} className="action-btn">Deposit</button>
        <button onClick={() => navigate('/withdraw')} className="action-btn">Withdraw</button>
        <button onClick={() => navigate('/balance')} className="action-btn">Check Balance</button>
        <button onClick={() => navigate('/transfer')} className="action-btn">Fund Transfer</button>
        <button onClick={() => navigate('/transactions')} className="action-btn">View Transactions</button>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isOpen ? 'shrink' : ''}`}>
        <div className="topBar">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>

        <div className="profileHeader">
          <u><h1>PROFILE</h1></u>
        </div>

        <div className="profile-container">
          <div className="picName">
            <img src={profile} alt="Profile" className="profile-pic" />
            <h1 className="userName">{customerData.name}</h1>
          </div>

          <div className="profile-details">
            <h2>Details</h2>
            <div className="userDetails">
              <p><strong>Account Number:</strong><br/>{customerData.accountNumber}</p>
            </div>
            <div className="userDetails">
              <p><strong>Age:</strong> {customerData.age}</p>
            </div>
            <div className="userDetails">
              <p><strong>Location:</strong><br/> {customerData.city}</p>
            </div>
          </div>

        </div>
        <div className='buttonset'>
              <div className='buttonset1'>
                <img onClick={() => navigate('/deposit')} src={depositImage} alt=''/>
                <img onClick={() => navigate('/withdraw')} src={withdrawImage} alt=''/>
                <img onClick={() => navigate('/balance')} src={checkBalanceImg} alt=''/>
              </div>
              <div className='buttonset2'>
                <img onClick={() => navigate('/transfer')} src={transactionImg} alt=''/>
                <img onClick={() => navigate('/transactions')} src={viewTransactionsImg} alt=''/>
              </div>
            </div>
        
      </div>
    </div>
  );
};

export default CustomerHomePage;
