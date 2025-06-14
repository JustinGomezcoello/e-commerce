import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t('login_error'));
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || t('login_error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="auth-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="auth-background"></div>
            <motion.div 
                className="auth-card"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="auth-title"
                >
                    {t('welcome_back')}
                </motion.h2>
                {error && (
                    <motion.div 
                        className="error-message"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        {error}
                    </motion.div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{t('username')}</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder={t('enter_username')}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('password')}</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={t('enter_password')}
                            required
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03, backgroundColor: "#ffd700" }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : t('sign_in')}
                    </motion.button>
                </form>
                <motion.p 
                    className="auth-link"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {t('no_account')} <Link to="/register">{t('register_here')}</Link>
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default Login;