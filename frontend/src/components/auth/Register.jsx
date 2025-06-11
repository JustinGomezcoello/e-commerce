import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Auth.css';

const Register = () => {    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
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

        try {            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t('register_error'));
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message || 'Error registering user');
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
                    {t('join_community')}
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
                        <label>{t('email')}</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t('enter_email')}
                            required
                        />
                    </div>                    <div className="form-group">
                        <label>{t('first_name')}</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder={t('enter_first_name')}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('last_name')}</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder={t('enter_last_name')}
                            required
                        />
                    </div>                    <div className="form-group">
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
                    <div className="form-group">
                        <label>{t('confirm_password')}</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder={t('confirm_password')}
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
                        {loading ? 'Creating Account...' : t('create_account')}
                    </motion.button>
                </form>
                <motion.p 
                    className="auth-link"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {t('have_account')} <Link to="/login">{t('login_here')}</Link>
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default Register;