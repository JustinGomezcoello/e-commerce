import React, { useState, useRef } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImageUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        handleFiles(files);
    };

    const handleFiles = (files) => {
        if (files && files[0]) {
            const file = files[0];
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
                onImageUpload(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        const files = e.target.files;
        handleFiles(files);
    };

    return (
        <div
            className={`image-upload-container ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
            
            {preview ? (
                <div className="preview-container">
                    <img src={preview} alt="Preview" className="image-preview" />
                    <div className="preview-overlay">
                        <span>Click or drag to change image</span>
                    </div>
                </div>
            ) : (
                <div className="upload-content">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Drag and drop an image here or click to select</p>
                    <span>Supported formats: JPG, PNG, GIF</span>
                </div>
            )}
        </div>
    );
};

export default ImageUpload; 