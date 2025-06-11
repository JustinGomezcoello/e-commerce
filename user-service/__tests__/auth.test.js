const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Auth Endpoints', () => {
    describe('POST /register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    username: 'testuser',
                    password: 'testpass123',
                    email: 'test@test.com',
                    firstName: 'Test',
                    lastName: 'User'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('username', 'testuser');
        });

        it('should not register user with existing username', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    username: 'testuser',
                    password: 'testpass123',
                    email: 'test2@test.com',
                    firstName: 'Test',
                    lastName: 'User'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('message', 'Username already exists');
        });
    });

    describe('POST /login', () => {
        it('should login existing user', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    username: 'testuser',
                    password: 'testpass123'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('username', 'testuser');
        });

        it('should not login with wrong password', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    username: 'testuser',
                    password: 'wrongpass'
                });

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('message', 'Invalid credentials');
        });
    });
});

describe('Protected Endpoints', () => {
    let token;
    let userId;

    beforeAll(async () => {
        // Crear un usuario y obtener token para pruebas
        const res = await request(app)
            .post('/register')
            .send({
                username: 'protecteduser',
                password: 'testpass123',
                email: 'protected@test.com',
                firstName: 'Protected',
                lastName: 'User'
            });

        token = res.body.token;
        userId = res.body.user.id;
    });

    describe('GET /profile', () => {
        it('should get user profile with valid token', async () => {
            const res = await request(app)
                .get('/profile')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.user).toHaveProperty('username', 'protecteduser');
        });

        it('should not get profile without token', async () => {
            const res = await request(app)
                .get('/profile');

            expect(res.statusCode).toBe(401);
        });
    });
});
