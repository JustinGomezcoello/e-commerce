import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState(500);
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    const products = [
        // T-Shirts
        {
            id: 1,
            name: 'To Love or to Be Loved',
            price: 49.99,
            image: 'https://i.imgur.com/nV3oM3K.jpg',
            category: 'T-Shirts',
            description: 'Limited edition philosophical streetwear piece'
        },
        {
            id: 2,
            name: 'Mind Games Tee',
            price: 45.99,
            image: 'https://i.imgur.com/2X4yKjD.jpg',
            category: 'T-Shirts',
            description: 'Premium cotton with minimalist design'
        },
        // Hoodies
        {
            id: 3,
            name: 'Ethereal Dreams Hoodie',
            price: 89.99,
            image: 'https://i.imgur.com/7rR8qG5.jpg',
            category: 'Hoodies',
            description: 'Oversized fit with embroidered details'
        },
        {
            id: 4,
            name: 'Silent Thoughts Hoodie',
            price: 95.99,
            image: 'https://i.imgur.com/uD3levB.jpg',
            category: 'Hoodies',
            description: 'Heavy-weight cotton blend'
        },
        // Accessories
        {
            id: 5,
            name: 'Mindful Chain',
            price: 29.99,
            image: 'https://i.imgur.com/pK9VVVt.jpg',
            category: 'Accessories',
            description: 'Stainless steel with vintage finish'
        },
        {
            id: 6,
            name: 'Abstract Thoughts Bag',
            price: 39.99,
            image: 'https://i.imgur.com/QN7dQk8.jpg',
            category: 'Accessories',
            description: 'Canvas tote with artistic print'
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

    const categories = ['all', 'T-Shirts', 'Hoodies', 'Accessories'];

    const handleWhatsApp = (product) => {
        const message = `Hi! I'm interested in ${product.name} (${product.price} USD)`;
        window.open(`https://wa.me/+593XXXXXXXXX?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="products-page">
            <div className="location-banner">
                <i className="fas fa-map-marker-alt"></i>
                Shipping available only in Quito, Ecuador
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
                    <label>Maximum price: ${priceRange}</label>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                    />
                </div>
            </div>

            <h1>Latest Collection</h1>
            
            <div className="products-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                            <div className="product-overlay">
                                <span className="product-description">{product.description}</span>
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