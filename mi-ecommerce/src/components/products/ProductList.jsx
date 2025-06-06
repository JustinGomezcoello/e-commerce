import React, { useState, useEffect } from 'react';
import './ProductList.css';

// Importar las imágenes (aquí deberás reemplazar con tus propias imágenes)
import tshirt1 from '../assets/images/tshirt1.jpg';
import tshirt2 from '../assets/images/tshirt2.jpg';
import hoodie1 from '../assets/images/hoodie1.jpg';
import hoodie2 from '../assets/images/hoodie2.jpg';
import accessory1 from '../assets/images/accessory1.jpg';
import accessory2 from '../assets/images/accessory2.jpg';

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
            image: tshirt1, // Usar la imagen importada
            category: 'T-Shirts',
            description: 'Limited edition philosophical streetwear piece'
        },
        {
            id: 2,
            name: 'Mind Games Tee',
            price: 45.99,
            image: tshirt2, // Usar la imagen importada
            category: 'T-Shirts',
            description: 'Premium cotton with minimalist design'
        },
        // Hoodies
        {
            id: 3,
            name: 'Ethereal Dreams Hoodie',
            price: 89.99,
            image: hoodie1, // Usar la imagen importada
            category: 'Hoodies',
            description: 'Oversized fit with embroidered details'
        },
        {
            id: 4,
            name: 'Silent Thoughts Hoodie',
            price: 95.99,
            image: hoodie2, // Usar la imagen importada
            category: 'Hoodies',
            description: 'Heavy-weight cotton blend'
        },
        // Accessories
        {
            id: 5,
            name: 'Mindful Chain',
            price: 29.99,
            image: accessory1, // Usar la imagen importada
            category: 'Accessories',
            description: 'Stainless steel with vintage finish'
        },
        {
            id: 6,
            name: 'Abstract Thoughts Bag',
            price: 39.99,
            image: accessory2, // Usar la imagen importada
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

    const handleBuyNow = (product) => {
        // Aquí puedes poner tu número de WhatsApp real
        const phoneNumber = '+593980267544';
        const message = `¡Hola! Me interesa comprar ${product.name} por $${product.price}. ¿Está disponible?`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
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

            <h1 className="collection-title">Latest Collection</h1>
            
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
                                className="buy-now-button"
                                onClick={() => handleBuyNow(product)}
                            >
                                <i className="fas fa-shopping-cart"></i>
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList; 