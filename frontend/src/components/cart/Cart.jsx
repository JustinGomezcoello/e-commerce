import React from 'react';
import { useTranslation } from 'react-i18next';
import './Cart.css';

const Cart = () => {
    const { t } = useTranslation();

    return (
        <div className="cart-container">
            <div className="cart-content">
                <div className="coming-soon-badge">
                    <span>{t('coming_soon')}</span>
                </div>
                <h1>{t('cart_title')}</h1>
                <p className="cart-description">{t('cart_coming_soon')}</p>
                <div className="whatsapp-info">
                    <i className="fab fa-whatsapp"></i>
                    <p>{t('whatsapp_currently')}</p>
                </div>
            </div>
        </div>
    );
};

export default Cart; 