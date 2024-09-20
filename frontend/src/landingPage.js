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
      alert('Sign In successful!');
      console.log(response.data);
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      alert('Sign In failed!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignUpSubmit = async () => {
    setLoading(true);
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
      alert('Sign Up successful!');
      console.log(response.data);
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      alert('Sign Up failed!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="landing-page">
      <header className="landing-header">
        <nav className="navbar">
          <h1 className="logo">MyBank</h1>
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
        </div>
      )}

      <section id="features" className="features-section">
        <h3>Our Features</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>Online Banking</h4>
            <p>Access your account from any device, 24/7.</p>
          </div>
          <div className="feature">
            <h4>Secure Transactions</h4>
            <p>We use industry-standard encryption to keep your data safe.</p>
          </div>
          <div className="feature">
            <h4>Easy Transfers</h4>
            <p>Transfer money between accounts with just a few clicks.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <h3>About Us</h3>
        <p>We are committed to providing the best banking experience with our modern and secure solutions.</p>
      </section>

      <section id="testimonials" className="testimonials-section">
        <h3>What Our Customers Say</h3>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>"MyBank has revolutionized the way I manage my finances."</p>
            <p>- Jane Doe</p>
          </div>
          <div className="testimonial">
            <p>"Fast, reliable, and secure banking!"</p>
            <p>- John Smith</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2024 MyBank. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default BankLandingPage;
