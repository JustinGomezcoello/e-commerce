const winston = require('winston');
const config = require('../config/config');

// Define los niveles de log personalizados
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
};

// Define los colores para cada nivel
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
};

// Añade los colores a winston
winston.addColors(colors);

// Crear el formato personalizado
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

// Crear el logger
const logger = winston.createLogger({
    levels,
    format,
    transports: [
        // Escribir en consola
        new winston.transports.Console(),
        // Escribir todos los logs en combined.log
        new winston.transports.File({
            filename: 'logs/combined.log'
        }),
        // Escribir solo errores en error.log
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        })
    ]
});

// Si estamos en desarrollo, mostrar logs en consola
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;
