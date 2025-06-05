import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../../utils/auth';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-brand">
                    STREETWEAR
                </Link>
            </div>
            
            <div className="navbar-center">
                <Link to="/" className="nav-link">Products</Link>
                <Link to="/new-arrivals" className="nav-link">New Arrivals</Link>
                <Link to="/brands" className="nav-link">Brands</Link>
            </div>

            <div className="navbar-right">
                {authenticated ? (
                    <div className="nav-auth">
                        <Link to="/cart" className="nav-link cart-link">
                            <i className="fas fa-shopping-cart"></i>
                            Cart
                        </Link>
                        <div className="user-menu">
                            <Link to="/profile" className="nav-link">
                                <i className="fas fa-user"></i>
                                My Account
                            </Link>
                            <button onClick={handleLogout} className="nav-link logout-btn">
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="nav-auth">
                        <Link to="/login" className="nav-link auth-link">Login</Link>
                        <Link to="/register" className="nav-link auth-link register-btn">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 