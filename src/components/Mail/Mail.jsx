import React, { useState, useEffect } from 'react';
import './Mail.css'; // Import CSS file for styling

const Mail = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (error || success) {
      timer = setTimeout(() => {
        setError(null);
        setSuccess(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://mailsender-production-b0f6.up.railway.app/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: email,
      });

      console.log('Response status:', response.status); // Log response status

      if (response.ok) {
        console.log('Subscription successful');
        setSuccess(true);
        setEmail('');
      } else {
        console.log('Subscription failed');
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Can\'t send, try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mail-container">
      <h2 className="mail-heading">KEEP UPDATED</h2>
      <h1 className="mail-title">NEWS LETTER</h1>
      <p className="mail-description">Stay updated with the latest news, exclusive offers, and more!</p>
      <form onSubmit={handleSubmit}>
        <input
          className="mail-email-input" // Apply custom class for styling
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="mail-submit-button" type="submit" disabled={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {(error || success) && (
        <div className={error ? "mail-error-notification" : "mail-success-notification"}>
          <p className={error ? "mail-error-message" : "mail-success-message"}>
            {error || "Subscribed successfully!"}  
            <button className="mail-close-icon" onClick={() => {setError(null); setSuccess(false);}}>
              &times;
            </button>
          </p>
          {loading && (
            <div className="mail-loading-bar">
              <div className="mail-loading-progress"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mail;
