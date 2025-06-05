import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3002/products');
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los productos');
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Cargando productos...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="products-container">
            <h1>Nuestros Productos</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img 
                            src={product.image || 'https://via.placeholder.com/150'} 
                            alt={product.name}
                            className="product-image"
                        />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                            <button 
                                className="add-to-cart-btn"
                                onClick={() => {
                                    // Si el usuario no está autenticado, redirigir al login
                                    const token = localStorage.getItem('token');
                                    if (!token) {
                                        window.location.href = '/login';
                                        return;
                                    }
                                    // Aquí irá la lógica para añadir al carrito
                                }}
                            >
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList; 