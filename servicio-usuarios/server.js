const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const { verifyToken, JWT_SECRET } = require('./middleware/auth');

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

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'Servicio de usuarios activo y funcionando' });
});

// Registro de usuarios
app.post('/register', async (req, res) => {
    try {
        const { username, password, email, name } = req.body;

        // Validaciones
        if (!username || !password || !email || !name) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario o email ya registrado' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            name
        });

        await newUser.save();

        // Generar token
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Usuario registrado con éxito',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                name: newUser.name
            }
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

// Login de usuarios
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validaciones
        if (!username || !password) {
            return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
        }

        // Buscar usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta protegida de ejemplo
app.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil' });
    }
});

app.listen(PORT, () => {
    console.log(`Servicio de Usuarios corriendo en http://localhost:${PORT}`);
});
