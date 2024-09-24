import React, { useState } from 'react';
import './landingPage.css';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom'; 

const BankLandingPage = () => {
  const [showForm, setShowForm] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); 

  const handleSignInClick = () => {
    setShowForm('signin');
  };

  const handleSignUpClick = () => {
    setShowForm('signup');
  };

  const handleSignInSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/signin', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const { status } = response.data;
  
      if (status === 'success') {
        alert('Sign In successful!');
        navigate('/dashboard'); // Redirect to dashboard on success
      } 
      else if (status === 'wrong_password') {
        alert('Incorrect password. Please try again.');
      } 
      else if (status === 'invalid_username') {
        alert('Invalid username. Please try again.');
      }
    } catch (error) {
      alert('Sign In failed due to a server error!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignUpSubmit = async () => {
    setLoading(true);
    setSignupMessage(''); // Clear previous messages
    setErrorMessage('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', {
        username,
        password,
        age,
        city
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSignupMessage(`Sign Up successful! Your Account Number is: ${response.data.account_number}`);
      console.log(response.data);
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error); // Show the error message from the server
      } 
      else {
        setErrorMessage('Sign Up failed! Please try again.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <nav className="navbar">
          <h1 className="logo">CSB Bank</h1>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="hero-section">
          <h2>Secure, Simple, and Fast Banking</h2>
          <p>Manage your finances with ease, anytime, anywhere.</p>
          <div className="hero-buttons">
            <button className="cta-button sign-in" onClick={handleSignInClick}>Sign In</button>
            <button className="cta-button sign-up" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </header>

      {showForm === 'signin' && (
        <div className="form-section">
          <h3>Sign In</h3>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignInSubmit} disabled={loading}>
            {loading ? 'Signing In...' : 'Submit'}
          </button>
        </div>
      )}

      {showForm === 'signup' && (
        <div className="form-section">
          <h3>Sign Up</h3>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <button onClick={handleSignUpSubmit} disabled={loading}>
            {loading ? 'Signing Up...' : 'Submit'}
          </button>

          {/* Render success and error messages */}
          {signupMessage && <div className="success-message">{signupMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      )}
    </div>
  );
};

export default BankLandingPage;
