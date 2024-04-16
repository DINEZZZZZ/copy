import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AdminPage = ({ setShowLogin }) => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    setShowLogin(false);
    navigate('/copy/');
  };

  const navigateToHighlightsPage = () => {
    navigate('/copy/highlights');
  };

  return (
    <div>
      <div className="flex items-center justify-between mx-4 my-2">
        <button className="bg-black text-white px-3 py-2 rounded" onClick={navigateToHomePage}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="text-2xl font-bold">Admin Portal</h1>
        <span className='database text-green-500'><FontAwesomeIcon icon={faDatabase} /></span>
      </div>

      <div className="highlight bg-blue-200 p-12 rounded-md cursor-pointer mt-10" onClick={navigateToHighlightsPage}>
        <h2 className="text-2xl font-semibold text-center">Highlights</h2>
      </div>
      <div className="highlight bg-yellow-200 p-12 rounded-md mt-10">
        <h2 className="text-2xl font-semibold text-center">Computers</h2>
      </div>
      <div className="highlight bg-green-200 p-12 rounded-md mt-10">
        <h2 className="text-2xl font-semibold text-center">Mobiles</h2>
      </div>
      <div className="highlight bg-red-200 p-12 rounded-md cursor-pointer mt-10" onClick={navigateToHighlightsPage}>
        <h2 className="text-2xl font-semibold text-center">Web services</h2>
      </div>
    </div>
  );
};

export default AdminPage;
