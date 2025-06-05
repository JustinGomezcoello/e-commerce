import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../utils/auth';
import './Navbar.css';

const Navbar = () => {
    const auth = isAuthenticated();

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">Mi E-commerce</Link>
            </div>
            <div className="nav-links">
                <Link to="/" className="nav-link">Productos</Link>
                {auth ? (
                    <>
                        <Link to="/cart" className="nav-link">
                            Carrito
                            <span className="cart-badge">0</span>
                        </Link>
                        <button onClick={logout} className="nav-link logout-btn">
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="nav-link">Iniciar Sesión</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 