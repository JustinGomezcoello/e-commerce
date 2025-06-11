const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

const userController = UserController.getInstance();

// Public routes
router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));

// Protected routes
router.get('/profile', verifyToken, (req, res) => userController.getProfile(req, res));

module.exports = router;