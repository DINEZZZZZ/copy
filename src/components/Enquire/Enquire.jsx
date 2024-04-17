import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from '../LoadingPage/LoadingPage';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import the Popup component here
import Popup from './PopUp'; // Adjust the path as per your project structure

const EnquireBox = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productName, setProductName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate('/copy/');
  };

  useEffect(() => {
    axios.get(`https://lazy-fly-production-e453.up.railway.app/api/highlight/get-product/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
        setProductName(response.data.title)
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleEnquireNow = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://lazy-fly-production-e453.up.railway.app/api/post-enquiry`, {
        productName,
        customerName,
        email,
        phoneNo,
        quantity
      });

      setIsModalOpen(true); // Open the modal on successful submission
      console.log("success");
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    // Reset all the state values to their initial state
    setCustomerName("");
    setEmail("");
    setPhoneNo("");
    setQuantity("");
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
      <div className="p-4 flex flex-col lg:flex-row justify-between items-start rounded shadow-md">
        <div className="w-full lg:w-1/2 flex flex-col justify-center mt-4">
          <div className="flex justify-center">
            <img src={product.image_URL} alt={product.title} className="enquire-box-image w-80 h-auto rounded-lg mb-4" />
          </div>
          <h1 className='text-2xl font-bold mb-2'>{product.title}</h1>
          <p className=' font-semibold'>RS. <span className=' line-through font-semibold text-gray-500	' >{product.price*2}</span> <span className="text-green-600 text-2xl font-bold">{product.price}</span></p>
          <p className=' font-semibold text-xl mt-4'>Description</p>
          <p className='text-gray-600 text-sm mb-4 mt-2'>{product.description}</p>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center mt-4 lg:mt-0">
          <h3 className='text-lg font-bold text-green-600 mb-4 mt-8'>Enquire Now</h3>
          <form className='w-full p-4' onSubmit={(e) => handleEnquireNow(e)}>
            <div className="flex flex-col gap-6 px-4">
              <input type="text" name="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required placeholder="Customer Name" className="input py-3 px-6 border border-gray-300 rounded-lg text-lg" />
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="input py-3 px-6 border border-gray-300 rounded-lg text-lg" />
              <input type="tel" name="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} placeholder="Phone Number" required className="input py-3 px-6 border border-gray-300 rounded-lg text-lg" />
              <input type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required className="input py-3 px-6 border border-gray-300 rounded-lg text-lg" />
            </div>
            <div className="flex justify-center">
  <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mt-4">
    Enquire Now
  </button>
</div>

          </form>
        </div>
      </div>
      
      
      {isModalOpen && (
  <Popup message="Congratulations! Your inquiry has been submitted successfully." onClose={closeModal} />
)}

    </>
  );
};

export default EnquireBox;
