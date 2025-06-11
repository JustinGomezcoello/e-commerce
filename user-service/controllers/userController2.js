const MongoUserRepository = require('../repositories/MongoUserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('../utils/logger');

class UserController {
    constructor() {
        this.userRepository = new MongoUserRepository();
    }

    async register(req, res) {
        try {
            const { username, password, email, firstName, lastName } = req.body;

            if (!username || !password || !email || !firstName || !lastName) {
                logger.warn('Registration attempt with missing fields');
                return res.status(400).json({
                    message: 'All fields are required'
                });
            }

            const existingUser = await this.userRepository.findByUsername(username);
            if (existingUser) {
                logger.warn(`Registration attempted with existing username: ${username}`);
                return res.status(400).json({
                    message: 'Username already exists'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await this.userRepository.create({
                username,
                password: hashedPassword,
                email,
                firstName,
                lastName
            });

            const token = jwt.sign(
                { id: user._id, username: user.username },
                config.jwt.secret,
                { expiresIn: config.jwt.expiresIn }
            );

            logger.info(`User registered successfully: ${username}`);
            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        } catch (error) {
            logger.error('Registration error:', error);
            res.status(500).json({ message: 'Error registering user' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                logger.warn('Login attempt with missing credentials');
                return res.status(400).json({
                    message: 'Username and password are required'
                });
            }

            const user = await this.userRepository.findByUsername(username);
            if (!user) {
                logger.warn(`Login attempted with non-existent username: ${username}`);
                return res.status(401).json({
                    message: 'Invalid credentials'
                });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                logger.warn(`Invalid password attempt for user: ${username}`);
                return res.status(401).json({
                    message: 'Invalid credentials'
                });
            }

            const token = jwt.sign(
                { id: user._id, username: user.username },
                config.jwt.secret,
                { expiresIn: config.jwt.expiresIn }
            );

            logger.info(`User logged in successfully: ${username}`);
            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        } catch (error) {
            logger.error('Login error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async getProfile(req, res) {
        try {
            const user = await this.userRepository.findById(req.user.id);
            if (!user) {
                logger.warn(`Profile request for non-existent user ID: ${req.user.id}`);
                return res.status(404).json({ message: 'User not found' });
            }

            logger.info(`Profile retrieved for user: ${user.username}`);
            res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        } catch (error) {
            logger.error('Get profile error:', error);
            res.status(500).json({ message: 'Error retrieving profile' });
        }
    }
}

module.exports = new UserController();
