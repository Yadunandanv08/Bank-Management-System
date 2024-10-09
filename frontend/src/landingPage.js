import React, { useState } from 'react';
import './landingPage.css';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
import introv from './images/4k.mp4';
import chechi from './images/hero-image.png';
import sura from './images/sura.jpeg';

const BankLandingPage = () => {
  const [showForm, setShowForm] = useState('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signInMessage, setSignInMessage] = useState('');

  const navigate = useNavigate(); 
  const [highlightBtn,setHighlightBtn] = useState(0);

  const highLightThis = (clickedbtnindex)=>{
    setHighlightBtn(clickedbtnindex);
  }
  const handleSignInClick = () => {
    setShowForm('signin');
  };

  const handleSignUpClick = () => {
    setShowForm('signup');
  };

  const handleSignInSubmit = async () => {
    setLoading(true);
    setSignInMessage('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/signin', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        const { message, accountNumber } = response.data;
        setSignInMessage(message);
  
        localStorage.setItem('accountNumber', accountNumber);
        localStorage.setItem('username', username);
  
        navigate('/CustomerHomePage');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setSignInMessage('Invalid username or password');
      } else {
        setSignInMessage('Sign In failed due to a server error!');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignUpSubmit = async () => {
    setLoading(true);
    setSignupMessage(''); 
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
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error); 
      } else {
        setErrorMessage('Sign Up failed! Please try again.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <img src={chechi} className='background-clip'></img>
        {/* <video autoplay muted playsInline className="background-clip">
          <source src={introv} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <div className='hover-area'>
          <header className='landing-header'>
            <p className='landing-header-logo'>CsBank</p>
            <div className='landing-header-links'>
              <p>Features</p>
              <p>About Us</p>
              <p>Content</p>
            </div>
            {/* content */}
          </header>
        </div>
      <div className='landing-hero'>
        <div className='intro-content'>
          <div className='intro-content-text'>
            <h2>Secure, Simple, and Fast Banking</h2>
            <p>Manage your finances with ease, anytime, anywhere.</p>
          </div>
          <div className='form-content'>
            <div className="hero-buttons">
              <button className={`cta-button ${highlightBtn === 0? 'active' : ''}`} onClick={() => {
                highLightThis(0);
                handleSignInClick();
              }}>Sign In</button>
              <button className={`cta-button ${highlightBtn === 1? 'active': ''}`} onClick={() => {
                highLightThis(1);
                handleSignUpClick();
              }}>Sign Up</button>
            </div>
            {showForm === 'signin' && (
        <div className="form-section">
          <h3>Sign In</h3>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button className='signInSubmitButton' onClick={handleSignInSubmit} disabled={loading}>
            {loading ? 'Signing In...' : 'Submit'}
          </button>

          {signInMessage && <div className="info-message">{signInMessage}</div>}
        </div>
      )}

      {showForm === 'signup' && (
        <div className="form-section">
          <h3>Sign Up</h3>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Age" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="City" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
          />
          <button className='signInSubmitButton' onClick={handleSignUpSubmit} disabled={loading}>
            {loading ? 'Signing Up...' : 'Submit'}
          </button>

          {signupMessage && <div className="success-message">{signupMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      )}
          </div>
        </div>
      </div>
      <footer className='landing-footer'></footer>

      {/* <header className="landing-header">
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
      </header> */}
    </div>
  );
};

export default BankLandingPage;
