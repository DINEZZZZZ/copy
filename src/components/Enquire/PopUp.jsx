import React, { useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const Popup = ({ message, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden'); // Add class to disable scrolling
    } else {
      document.body.classList.remove('overflow-hidden'); // Remove class to enable scrolling
    }

    return () => {
      document.body.classList.remove('overflow-hidden'); // Clean up when component unmounts
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose(); // Call the onClose function provided by the parent component
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 text-center flex flex-col items-center">
            <FiCheckCircle className="text-green-600 text-6xl mb-4 self-center" />
            <p className="text-lg mb-4">{message}</p>
            <button
              onClick={handleClose}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
