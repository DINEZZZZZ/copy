import React from 'react';
import './LoadingPage.css'; 

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-bar">
        <div className="loading-fill"></div>
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingPage;
