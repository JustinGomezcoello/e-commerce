const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const logger = require('./utils/logger');
const loggingMiddleware = require('./middleware/loggingMiddleware');
const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');
const circuitBreaker = require('./services/circuitBreaker');

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use('/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/', userRoutes); // Also mount on root for backward compatibility with tests

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Database connection with circuit breaker
const connectDB = async () => {
    try {
        await circuitBreaker.execute('mongodb-connection', async () => {
            await mongoose.connect(config.database.url, config.database.options);
            logger.info('Connected to MongoDB');
        });
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
    logger.info('SIGTERM received. Starting graceful shutdown...');
    await mongoose.disconnect();
    process.exit(0);
});

// Only start the server if this file is run directly (not required as a module)
if (require.main === module) {
    connectDB();
    const PORT = config.server.port;
    app.listen(PORT, () => {
        logger.info(`User service running on port ${PORT}`);
    });
}

module.exports = app;
