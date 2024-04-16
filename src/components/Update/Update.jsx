import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPage from '../LoadingPage/LoadingPage';

const Update = () => {
  const productId = useParams().id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [image_URL, setImage_URL] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/highlight/update-product/${productId}`, {
        title,
        price,
        image_URL,
        description,
        quantity
      });

      navigate('/copy/highlights');
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  };

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/highlight/get-product/${productId}`);
      const { data } = response;
      setTitle(data.title);
      setPrice(data.price);
      setImage_URL(data.image_URL);
      setDescription(data.description);
      setQuantity(data.quantity);
    } catch (error) {
      console.error('Error loading product: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <h2 className="font-bold text-3xl text-center mt-5">Update Product</h2>
          <form onSubmit={handleSubmit} className="update-form px-10 mt-10 ">
            <div className="form-group mb-4">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="image_URL">Image URL</label>
              <input type="text" id="image_URL" value={image_URL} onChange={(e) => setImage_URL(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="description">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-2 border border-gray-300 rounded"></textarea>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="quantity">Quantity</label>
              <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="flex gap-10 justify-center w-full mt-4">
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Submit</button>
              <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={() => navigate('/copy/highlights')}>Cancel</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Update;
