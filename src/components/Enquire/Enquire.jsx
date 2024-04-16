import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from '../LoadingPage/LoadingPage';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EnquireBox = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate('/copy/');
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/highlight/get-product/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleEnquireNow = () => {
    console.log('Enquiry submitted');
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <>
    <div className='bg-teal-600'>
    <FontAwesomeIcon onClick={navigateBack} icon={faArrowLeft} className="cursor-pointer p-3 text-xl" />
    </div>
    <div className=" p-4 flex flex-col lg:flex-row justify-between items-start  rounded shadow-md ">
    
      
      
    <div className=" w-full lg:w-1/2 flex flex-col  justify-center mt-4"> {/* Modified className */}
  <div className="flex justify-center">
    <img src={product.image_URL} alt={product.title} className="enquire-box-image w-80 h-auto rounded-lg mb-4" />
  </div>
  <h1 className='text-2xl font-bold mb-2'>{product.title}</h1>
  <p className="text-green-600 text-xl">${product.price}</p>
  <p className='text-gray-600 text-sm mb-4 mt-2'>{product.description}</p>
</div>

      <div className=" w-full lg:w-1/2 flex flex-col items-center mt-4 lg:mt-0">
        <h3 className='text-lg font-bold text-green-600 mb-4 mt-8'>Enquire Now</h3>
        <div className="flex flex-col space-y-4 w-full">
          <input type="text" placeholder="Username" className="input py-3 px-4 border border-gray-300 rounded-lg" />
          <input type="email" placeholder="Email" className="input py-3 px-4 border border-gray-300 rounded-lg" />
          <input type="tel" placeholder="Mobile Number" className="input py-3 px-4 border border-gray-300 rounded-lg" />
          <input type="number" placeholder="Quantity" className="input py-3 px-4 border border-gray-300 rounded-lg" />
        </div>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mt-4" onClick={handleEnquireNow}>Enquire Now</button>
      </div>
    </div>
    </>
  );
};

export default EnquireBox;
