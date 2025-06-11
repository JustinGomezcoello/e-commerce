module.exports = {
    database: {
        url: process.env.MONGODB_URI || 'mongodb://localhost:27017/e-commerce'
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    },
    server: {
        port: process.env.PORT || 3001
    },
    cors: {
        origins: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
    }
};
