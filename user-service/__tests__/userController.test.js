const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const UserController = require('../controllers/userController');
const MongoUserRepository = require('../repositories/MongoUserRepository');

describe('UserController', () => {
    let mongoServer;
    let userController;
    let mockRequest;
    let mockResponse;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        userController = new UserController();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(() => {
        mockRequest = {
            body: {},
            user: {}
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('register', () => {
        const validUser = {
            username: 'testuser',
            password: 'testpass123',
            email: 'test@test.com',
            firstName: 'Test',
            lastName: 'User'
        };

        test('should register a new user successfully', async () => {
            mockRequest.body = validUser;
            await userController.register(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User registered successfully',
                    token: expect.any(String),
                    user: expect.objectContaining({
                        username: validUser.username,
                        email: validUser.email
                    })
                })
            );
        });

        test('should not register user with missing fields', async () => {
            mockRequest.body = { username: 'testuser' };
            await userController.register(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'All fields are required'
                })
            );
        });
    });

    describe('login', () => {
        beforeAll(async () => {
            const userRepo = new MongoUserRepository();
            await userRepo.create({
                username: 'logintest',
                password: await bcrypt.hash('testpass123', 10),
                email: 'login@test.com',
                firstName: 'Login',
                lastName: 'Test'
            });
        });

        test('should login successfully with correct credentials', async () => {
            mockRequest.body = {
                username: 'logintest',
                password: 'testpass123'
            };
            await userController.login(mockRequest, mockResponse);

            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Login successful',
                    token: expect.any(String)
                })
            );
        });

        test('should not login with incorrect password', async () => {
            mockRequest.body = {
                username: 'logintest',
                password: 'wrongpass'
            };
            await userController.login(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Invalid credentials'
                })
            );
        });
    });
});
