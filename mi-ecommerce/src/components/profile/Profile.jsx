import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        address: '123 Street Fashion',
        avatar: 'https://i.pravatar.cc/150',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserInfo(prev => ({
                    ...prev,
                    avatar: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInfoUpdate = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para actualizar la información en el backend
        alert('Profile updated successfully!');
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    <img src={userInfo.avatar} alt="Profile" />
                    <div className="avatar-overlay">
                        <label htmlFor="avatar-upload" className="avatar-upload-btn">
                            Change Photo
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
                <h1>{userInfo.name}</h1>
            </div>

            <div className="profile-tabs">
                <button
                    className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('personal')}
                >
                    Personal Info
                </button>
                <button
                    className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders
                </button>
                <button
                    className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
                    onClick={() => setActiveTab('payment')}
                >
                    Payment Methods
                </button>
            </div>

            <div className="profile-content">
                {activeTab === 'personal' && (
                    <form onSubmit={handleInfoUpdate} className="profile-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={userInfo.name}
                                onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={userInfo.email}
                                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                value={userInfo.phone}
                                onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                                value={userInfo.address}
                                onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="save-btn">Save Changes</button>
                    </form>
                )}

                {activeTab === 'orders' && (
                    <div className="orders-section">
                        <p className="no-orders">No orders yet</p>
                    </div>
                )}

                {activeTab === 'payment' && (
                    <div className="payment-section">
                        <p>For now, all payments are handled through WhatsApp chat.</p>
                        <button 
                            className="whatsapp-btn"
                            onClick={() => {
                                const message = "Hi! I'd like to discuss payment methods";
                                window.open(`https://wa.me/+1234567890?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                        >
                            Contact via WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile; 