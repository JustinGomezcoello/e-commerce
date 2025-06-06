import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ProductList.css';

// Importar las imágenes (aquí deberás reemplazar con tus propias imágenes)
import tshirt1 from '../../assets/images/tshirt1.png';
import tshirt2 from '../../assets/images/tshirt2.png';
import hoodie1 from '../../assets/images/hoodie1.png';
import hoodie2 from '../../assets/images/hoodie2.png';
import accessory1 from '../../assets/images/accessory1.png';
import accessory2 from '../../assets/images/accessory2.png';

const ProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState(500);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { t } = useTranslation();
    
    const products = [
        // T-Shirts
        {
            id: 1,
            name: 'To Love or to Be Loved',
            price: 49.99,
            image: tshirt1, // Usar la imagen importada
            category: 'T-Shirts',
            description: t('limited_edition')
        },
        {
            id: 2,
            name: 'Mind Games Tee',
            price: 45.99,
            image: tshirt2, // Usar la imagen importada
            category: 'T-Shirts',
            description: t('premium_cotton')
        },
        // Hoodies
        {
            id: 3,
            name: 'Ethereal Dreams Hoodie',
            price: 89.99,
            image: hoodie1, // Usar la imagen importada
            category: 'Hoodies',
            description: t('oversized_fit')
        },
        {
            id: 4,
            name: 'Silent Thoughts Hoodie',
            price: 95.99,
            image: hoodie2, // Usar la imagen importada
            category: 'Hoodies',
            description: t('heavy_weight')
        },
        // Accessories
        {
            id: 5,
            name: 'Mindful Chain',
            price: 29.99,
            image: accessory1, // Usar la imagen importada
            category: 'Accessories',
            description: t('stainless_steel')
        },
        {
            id: 6,
            name: 'Abstract Thoughts Bag',
            price: 39.99,
            image: accessory2, // Usar la imagen importada
            category: 'Accessories',
            description: t('canvas_tote')
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

    const handleBuyNow = (product) => {
        const phoneNumber = '+593980267544';
        const message = `¡Hola! Me interesa comprar ${product.name} por $${product.price}. ¿Está disponible?`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="products-page">
            <div className="location-banner">
                <i className="fas fa-map-marker-alt"></i>
                {t('shipping_available')}
            </div>

            <div className="filters-section">
                <div className="categories">
                    {['all', 'T-Shirts', 'Hoodies', 'Accessories'].map(category => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category === 'all' ? t('all_products') : t(category)}
                        </button>
                    ))}
                </div>
                
                <div className="price-filter">
                    <label>{t('maximum_price')}: ${priceRange}</label>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                    />
                </div>
            </div>

            <h1 className="collection-title">{t('latest_collection')}</h1>
            
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
                            <p className="product-category">{t(product.category)}</p>
                            <p className="product-price">${product.price}</p>
                            <button 
                                className="buy-now-button"
                                onClick={() => handleBuyNow(product)}
                            >
                                <i className="fas fa-shopping-cart"></i>
                                {t('buy_now')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList; 