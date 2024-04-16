import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from '../LoadingPage/LoadingPage';

const HighLights = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/highlight/get-products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const navigateBack = () => {
    navigate('/copy/admin'); 
  };

  const navigateAdd = () => {
    navigate('/copy/add');
  };

  const navigateUpdate = (id) => {
    navigate(`/copy/update/${id}`);
  };

  const navigateDelete = () => {
    // Implement delete functionality
  };

  return (
    <div>
      {loading && <LoadingPage />}
      {!loading && (
        <div>
          <div className='container-high bg-gray-200 p-4 rounded-md flex items-center justify-between'>
            <button className="back-button bg-black text-white px-3 py-2 rounded" onClick={navigateBack}>Back</button>
            <h2 className="text-xl font-bold">HighLights</h2>
            <button className='add-button bg-green-500 text-white px-4 py-2 rounded' onClick={navigateAdd}>Add</button>
          </div>
          <div className="product-add-del">
            {products.map(item => (
              <div key={item.id} className='product-add-del-div bg-white p-4 rounded-md shadow-md flex justify-between items-center mb-4'>
                <span className="font-bold text-xs md:text-xl">{item.title}</span>
                <div>
                  <button onClick={() => navigateUpdate(item.id)} className="products-add-btn bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
                  <button onClick={navigateDelete} className="products-del-btn bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HighLights;
