import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductsItem from '../ProductItems/ProductsItem';
import './Products.css'

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://lazy-fly-production-e453.up.railway.app/api/highlight/get-products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div className="products-display-container">
            <h2 className="products-title">Top products for you.</h2>
            <div className="products-display-list">
                {products.map((item, index) => (
                    <ProductsItem
                        key={index}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        image={item.image_URL}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;
