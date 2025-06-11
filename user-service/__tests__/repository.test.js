const request = require('supertest');
const app = require('../server');
const MongoUserRepository = require('../repositories/MongoUserRepository');

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('User Repository', () => {
    let userRepository;
    let testUser;
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        userRepository = new MongoUserRepository();
        testUser = {
            username: 'testrepo',
            password: 'testpass123',
            email: 'testrepo@test.com',
            firstName: 'Test',
            lastName: 'Repository'
        };
    }, 30000);

    beforeEach(async () => {
        // Limpiar la colección de usuarios antes de cada prueba
        await userRepository.deleteAll();
    });

    it('should create a new user', async () => {
        const user = await userRepository.create(testUser);
        expect(user).toBeDefined();
        expect(user.username).toBe(testUser.username);
        expect(user.email).toBe(testUser.email);
    });

    it('should find user by username', async () => {
        await userRepository.create(testUser);
        const foundUser = await userRepository.findByUsername(testUser.username);
        expect(foundUser).toBeDefined();
        expect(foundUser.username).toBe(testUser.username);
    });

    it('should find user by email', async () => {
        await userRepository.create(testUser);
        const foundUser = await userRepository.findByEmail(testUser.email);
        expect(foundUser).toBeDefined();
        expect(foundUser.email).toBe(testUser.email);
    });

    it('should update user', async () => {
        const user = await userRepository.create(testUser);
        const updatedUser = await userRepository.update(user._id, {
            firstName: 'Updated'
        });
        expect(updatedUser.firstName).toBe('Updated');
    });

    it('should delete user', async () => {
        const user = await userRepository.create(testUser);
        await userRepository.delete(user._id);
        const foundUser = await userRepository.findById(user._id);
        expect(foundUser).toBeNull();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    }, 30000);
});
