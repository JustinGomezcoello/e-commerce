import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated, logout } from '../../utils/auth';
import LanguageSelector from '../LanguageSelector';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="nav-link">
                    <i className="fas fa-home"></i>
                </Link>
            </div>
            
            <div className="navbar-center">
                <Link to="/" className="brand-name">THOUGHTS</Link>
            </div>            <div className="navbar-right">
                {authenticated ? (
                    <div className="nav-auth">
                        <Link to="/cart" className="nav-link cart-link">
                            <i className="fas fa-shopping-cart"></i>
                            {t('cart')}
                        </Link>
                        <div className="user-menu">
                            <Link to="/profile" className="nav-link">
                                <i className="fas fa-user"></i>
                            </Link>
                            <button onClick={handleLogout} className="nav-link logout-btn">
                                <i className="fas fa-sign-out-alt"></i>
                                {t('logout')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="nav-auth">
                        <Link to="/login" className="nav-link auth-link">{t('login')}</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 