import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../LoadingPage/LoadingPage';

const Login = ({ setShowLogin, setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when making the API request

    try {
      const response = await axios.post('https://lazy-fly-production-e453.up.railway.app/api/v1/signin', {
        username,
        password
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setIsLoginFormVisible(false);
        sessionStorage.setItem("isAuthenticated", "true");
        navigate('/copy/admin');
      } else {
        setError('Sign-in failed');
      }
    } catch (error) {
      setError('Invalid credentials!');
    }

    setLoading(false); // Set loading back to false after receiving the API response
  };

  useEffect(() => {
    if (isLoginFormVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = 'unset'; // Reset overflow when component unmounts
    };
  }, [isLoginFormVisible]);

  return (
    <div>
      {isLoginFormVisible && !loading && ( // Render loading page only when login form is visible and not loading
        <div className='login-popup'>
          <form className="login-popup-container" onSubmit={handleSubmit}>
            <h5 className='error-message'>*Exclusive access for administrators only*</h5>
            <div className='login-popup-title'>
              <h2>Login</h2>
              <FontAwesomeIcon className='login-popup-title-img' onClick={() => setShowLogin(false)} icon={faXmark} />
            </div>
            <div className='login-popup-inputs'>
              <div className="form-group">
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder='User name'
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
            <button type="submit" className="submit-btn">Sign In</button>
          </form>
        </div>
      )}

      {loading && <LoadingPage />} {/* Render loading page when loading state is true */}
    </div>
  );
};

export default Login;
