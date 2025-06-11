const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const { verifyToken, JWT_SECRET } = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Conexión a MongoDB
mongoose.connect('mongodb://mongoadmin:secretpassword@mongo:27017/mi-ecommerce', {
    authSource: "admin",
    dbName: "mi-ecommerce"
}).then(() => {
    console.log('Conexión exitosa a MongoDB');
}).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
});

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'User service active and running' });
});

// User registration
app.post('/register', async (req, res) => {
    try {
        const { username, password, email, name } = req.body;

        // Validations
        if (!username || !password || !email || !name) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already registered' });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            name
        });

        await newUser.save();

        // Generate token
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                name: newUser.name
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// User login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validations
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Example protected route
app.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error getting profile' });
    }
});

// Update user
app.put('/users/:id', verifyToken, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updates = {};
        
        // Only update provided fields
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (password) {
            updates.password = await bcrypt.hash(password, 10);
        }

        // Ensure only the user can update their profile
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'You do not have permission to update this user' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
});

// Delete user
app.delete('/users/:id', verifyToken, async (req, res) => {
    try {
        // Ensure only the user can delete their account
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'You do not have permission to delete this user' });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`User Service running at http://localhost:${PORT}`);
});
