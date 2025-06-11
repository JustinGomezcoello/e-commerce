const CircuitBreaker = require('opossum');
const logger = require('../utils/logger');

class CircuitBreakerService {
    constructor() {
        this.breakers = new Map();
    }

    createBreaker(name, func, options = {}) {
        const defaultOptions = {
            timeout: 3000, // 3 segundos
            errorThresholdPercentage: 50,
            resetTimeout: 30000, // 30 segundos
            ...options
        };

        const breaker = new CircuitBreaker(func, defaultOptions);

        // Event handlers
        breaker.on('success', () => {
            logger.info(`Circuit ${name}: Success`);
        });

        breaker.on('timeout', () => {
            logger.warn(`Circuit ${name}: Timeout`);
        });

        breaker.on('reject', () => {
            logger.warn(`Circuit ${name}: Rejected (Circuit is open)`);
        });

        breaker.on('open', () => {
            logger.warn(`Circuit ${name}: Opened`);
        });

        breaker.on('close', () => {
            logger.info(`Circuit ${name}: Closed`);
        });

        breaker.on('halfOpen', () => {
            logger.info(`Circuit ${name}: Half Open`);
        });

        breaker.fallback(() => {
            logger.error(`Circuit ${name}: Fallback called`);
            return { error: 'Service temporarily unavailable' };
        });

        this.breakers.set(name, breaker);
        return breaker;
    }

    getBreaker(name) {
        return this.breakers.get(name);
    }

    async execute(name, func, ...args) {
        let breaker = this.getBreaker(name);
        if (!breaker) {
            breaker = this.createBreaker(name, func);
        }
        return await breaker.fire(...args);
    }
}

module.exports = new CircuitBreakerService();
