import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getUser } from '../../utils/auth';
import './Profile.css';

const UserIcon = () => (
  <div className="profile-avatar-icon">
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#e0e0e0"/>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#bdbdbd"/>
    </svg>
  </div>
);

const Profile = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('personal');
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar: ''
    });
    const [displayName, setDisplayName] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const user = getUser();
        if (user) {
            setUserInfo(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
            }));
            setDisplayName(user.name || '');
        }
    }, []);

    useEffect(() => {
        setHasChanges(
            userInfo.name !== displayName
        );
    }, [userInfo, displayName]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserInfo(prev => ({
                    ...prev,
                    avatar: reader.result
                }));
                setHasChanges(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInfoUpdate = (e) => {
        e.preventDefault();
        setDisplayName(userInfo.name);
        setShowSuccess(true);
        setHasChanges(false);
        setTimeout(() => setShowSuccess(false), 2500);
    };

    const handleFieldChange = (field, value) => {
        setUserInfo(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="profile-container glass-bg">
            <div className="profile-header">
                <h2 className="profile-title">{t('my_profile') || 'My Profile'}</h2>
                <div className="profile-avatar">
                    {userInfo.avatar ? (
                        <img src={userInfo.avatar} alt="Profile" />
                    ) : (
                        <UserIcon />
                    )}
                    <div className="avatar-overlay">
                        <label htmlFor="avatar-upload" className="avatar-upload-btn">
                            {t('change_photo')}
                        </label>
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <h1 className="profile-username">{displayName}</h1>
            </div>

            <div className="profile-tabs">
                <button
                    className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('personal')}
                >
                    {t('personal_info')}
                </button>
                <button
                    className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    {t('orders')}
                </button>
                <button
                    className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
                    onClick={() => setActiveTab('payment')}
                >
                    {t('payment_methods')}
                </button>
            </div>

            <div className="profile-content">
                {showSuccess && (
                    <div className="profile-success-msg">{t('profile_updated')}</div>
                )}
                {activeTab === 'personal' && (
                    <form onSubmit={handleInfoUpdate} className="profile-form">
                        <div className="form-group">
                            <label>{t('full_name')}</label>
                            <input
                                type="text"
                                value={userInfo.name}
                                onChange={e => handleFieldChange('name', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('email')}</label>
                            <input
                                type="email"
                                value={userInfo.email}
                                onChange={e => handleFieldChange('email', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('phone')}</label>
                            <input
                                type="tel"
                                value={userInfo.phone}
                                onChange={e => handleFieldChange('phone', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('address')}</label>
                            <textarea
                                value={userInfo.address}
                                onChange={e => handleFieldChange('address', e.target.value)}
                            />
                        </div>
                        <button type="submit" className={`save-btn${hasChanges ? ' save-btn-pending' : ''}`} disabled={!hasChanges}>
                            {t('save_changes')}
                        </button>
                    </form>
                )}

                {activeTab === 'orders' && (
                    <div className="orders-section">
                        <p className="no-orders">{t('no_orders')}</p>
                    </div>
                )}

                {activeTab === 'payment' && (
                    <div className="payment-section">
                        <p>{t('payment_info')}</p>
                        <button 
                            className="whatsapp-btn"
                            onClick={() => {
                                const message = t('whatsapp_payment_message');
                                window.open(`https://wa.me/+1234567890?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                        >
                            {t('contact_whatsapp')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile; 