const logger = require('../utils/logger');

const loggingMiddleware = (req, res, next) => {
    // Log request details
    logger.info(`${req.method} ${req.url} - IP: ${req.ip}`);

    // Track response time
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    });

    // Log errors
    res.on('error', (error) => {
        logger.error(`${req.method} ${req.url} - Error: ${error.message}`);
    });

    next();
};

module.exports = loggingMiddleware;
