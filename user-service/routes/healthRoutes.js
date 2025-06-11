const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const logger = require('../utils/logger');

// Health check básico
router.get('/health', (req, res) => {
    res.json({ status: 'UP' });
});

// Health check detallado
router.get('/health/detail', async (req, res) => {
    try {
        const healthCheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
            services: {
                database: 'UP',
                server: 'UP'
            }
        };

        // Verificar conexión a MongoDB
        if (mongoose.connection.readyState === 1) {
            healthCheck.services.database = 'UP';
        } else {
            healthCheck.services.database = 'DOWN';
            healthCheck.message = 'Database connection error';
        }

        // Verificar memoria
        const memoryUsage = process.memoryUsage();
        healthCheck.memory = {
            rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
            heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`
        };

        logger.info('Health check performed successfully');
        res.json(healthCheck);
    } catch (error) {
        logger.error('Health check failed:', error);
        res.status(503).json({
            status: 'ERROR',
            message: error.message
        });
    }
});

module.exports = router;
