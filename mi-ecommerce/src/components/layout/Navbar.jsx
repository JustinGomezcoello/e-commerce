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
            <div className="navbar-brand">
                <Link to="/">STREETWEAR</Link>
            </div>
            <div className="navbar-menu">
                <Link to="/" className="nav-link">Products</Link>
                {authenticated ? (
                    <>
                        <Link to="/cart" className="nav-link">Cart</Link>
                        <div className="nav-auth">
                            <Link to="/profile" className="nav-link">My Account</Link>
                            <button onClick={handleLogout} className="nav-link logout-btn">
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="nav-auth">
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 