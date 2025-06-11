const axios = require('axios');

async function testEndpoints() {
    try {
        // Test registration
        console.log('Testing registration...');
        const registerResponse = await axios.post('http://localhost:3000/api/users/register', {
            username: 'testuser2',
            email: 'test2@example.com',
            password: '123456'
        });
        console.log('Registration successful:', registerResponse.data);

        // Test login
        console.log('\nTesting login...');
        const loginResponse = await axios.post('http://localhost:3000/api/users/login', {
            email: 'test2@example.com',
            password: '123456'
        });
        console.log('Login successful:', loginResponse.data);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testEndpoints(); 