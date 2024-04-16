import React, { useEffect, useRef } from 'react';
import './ProductsItems.css';
import { useNavigate } from 'react-router-dom';

const ProductsItem = ({ id, title, price, description, image }) => {
  const productRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fadeIn');
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(productRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const navigateToEnquire = (id) => {
    navigate(`/copy/enquire/${id}`); // Navigate to the product's details page
  };

  // Function to format price with commas and style
  const formatPriceWithStyle = (price) => {
    // Convert price to string and add commas
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Transform to uppercase and add spacing between characters
    return formattedPrice.toUpperCase().split('').join(' ');
  };

  return (
    <div onClick={() => navigateToEnquire(id)} ref={productRef} className='custom-product-item'> {/* Unique class name */}
      <div className="product-item-img-container">
        <img src={image} alt="" className="product-item-image" />
      </div>
      <div className="product-item-info">
        <p className='font'>{title}</p>
        <p className="product-item-price">R S . {formatPriceWithStyle(price)}</p> {/* Format price with style */}
      </div>
    </div>
  );
};

export default ProductsItem;
