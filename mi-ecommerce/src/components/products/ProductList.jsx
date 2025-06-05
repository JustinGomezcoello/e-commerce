import React, { useState } from 'react';
import './ProductList.css';

const ProductList = () => {
    const [products] = useState([
        {
            id: 1,
            name: 'Supreme Box Logo Hoodie',
            price: 299.99,
            image: 'https://placeholder.com/400x300',
            category: 'Hoodies'
        },
        {
            id: 2,
            name: 'BAPE Camo T-Shirt',
            price: 129.99,
            image: 'https://placeholder.com/400x300',
            category: 'T-Shirts'
        },
        {
            id: 3,
            name: 'Off-White Industrial Belt',
            price: 199.99,
            image: 'https://placeholder.com/400x300',
            category: 'Accessories'
        },
        {
            id: 4,
            name: 'Nike x Travis Scott Air Jordan 1',
            price: 499.99,
            image: 'https://placeholder.com/400x300',
            category: 'Footwear'
        },
        {
            id: 5,
            name: 'Palace Tri-Ferg Deck',
            price: 69.99,
            image: 'https://placeholder.com/400x300',
            category: 'Accessories'
        },
        {
            id: 6,
            name: 'Stüssy Basic Logo Tee',
            price: 45.99,
            image: 'https://placeholder.com/400x300',
            category: 'T-Shirts'
        }
    ]);

    return (
        <div className="products-container">
            <h1>Latest Streetwear Drops</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="product-category">{product.category}</p>
                            <p className="product-price">${product.price}</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList; 