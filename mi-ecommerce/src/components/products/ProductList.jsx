import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState(500);
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    const products = [
        // Hoodies
        {
            id: 1,
            name: 'Supreme Box Logo Hoodie',
            price: 299.99,
            image: 'https://i.imgur.com/8PqZJE8.jpg',
            category: 'Hoodies'
        },
        {
            id: 2,
            name: 'BAPE Full Zip Shark Hoodie',
            price: 389.99,
            image: 'https://i.imgur.com/YXJLWBv.jpg',
            category: 'Hoodies'
        },
        // T-Shirts
        {
            id: 3,
            name: 'BAPE Camo T-Shirt',
            price: 129.99,
            image: 'https://i.imgur.com/QN7SExW.jpg',
            category: 'T-Shirts'
        },
        {
            id: 4,
            name: 'Off-White Arrows T-Shirt',
            price: 159.99,
            image: 'https://i.imgur.com/7ZXwVKX.jpg',
            category: 'T-Shirts'
        },
        // Accessories
        {
            id: 5,
            name: 'Off-White Industrial Belt',
            price: 199.99,
            image: 'https://i.imgur.com/9ZYqhWX.jpg',
            category: 'Accessories'
        },
        {
            id: 6,
            name: 'Supreme Backpack',
            price: 249.99,
            image: 'https://i.imgur.com/L5JvqnH.jpg',
            category: 'Accessories'
        },
        // Caps
        {
            id: 7,
            name: 'Supreme Camp Cap',
            price: 79.99,
            image: 'https://i.imgur.com/K9YH3FZ.jpg',
            category: 'Caps'
        },
        {
            id: 8,
            name: 'BAPE Trucker Cap',
            price: 89.99,
            image: 'https://i.imgur.com/2X8VJvP.jpg',
            category: 'Caps'
        },
        // Sneakers
        {
            id: 9,
            name: 'Nike x Travis Scott Air Jordan 1',
            price: 499.99,
            image: 'https://i.imgur.com/XZwWXfU.jpg',
            category: 'Sneakers'
        },
        {
            id: 10,
            name: 'Yeezy Boost 350 V2',
            price: 399.99,
            image: 'https://i.imgur.com/NhcXvPN.jpg',
            category: 'Sneakers'
        }
    ];

    useEffect(() => {
        filterProducts();
    }, [selectedCategory, priceRange]);

    const filterProducts = () => {
        let filtered = products;
        
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }
        
        filtered = filtered.filter(product => product.price <= priceRange);
        setFilteredProducts(filtered);
    };

    const categories = ['all', 'Hoodies', 'T-Shirts', 'Accessories', 'Caps', 'Sneakers'];

    const handleWhatsApp = (product) => {
        const message = `¡Hola! Estoy interesado en ${product.name} (${product.price} USD)`;
        window.open(`https://wa.me/+593XXXXXXXXX?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="products-page">
            <div className="location-banner">
                <i className="fas fa-map-marker-alt"></i>
                Envíos disponibles solo en Quito, Ecuador
            </div>
            
            <div className="filters-section">
                <div className="categories">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category === 'all' ? 'All Products' : category}
                        </button>
                    ))}
                </div>
                
                <div className="price-filter">
                    <label>Precio máximo: ${priceRange}</label>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                    />
                </div>
            </div>

            <h1>Latest Streetwear Drops</h1>
            
            <div className="products-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                            <div className="product-overlay">
                                <span className="view-details">View Details</span>
                            </div>
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="product-category">{product.category}</p>
                            <p className="product-price">${product.price}</p>
                            <button 
                                className="contact-whatsapp"
                                onClick={() => handleWhatsApp(product)}
                            >
                                <i className="fab fa-whatsapp"></i>
                                Contact on WhatsApp
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList; 