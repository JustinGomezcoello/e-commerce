const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const app = express();
const cors = require('cors');
app.use(cors());

const PORT = 3001;

// Conexión a MongoDB
mongoose.connect('mongodb://mongoadmin:secretpassword@mongo:27017/mi-ecommerce', {
    authSource: "admin",
    dbName: "mi-ecommerce"
});


app.get('/', (req, res) => {
    res.send('Servicio de usuarios activo y funcionando');
});


// Definición del esquema y modelo para los usuarios
const userSchema = new Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

app.use(express.json());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el nuevo usuario en MongoDB
    const newUser = new User({ username, password: hashedPassword });
    newUser.save()
        .then(user => {
            const token = jwt.sign({ id: user._id }, 'tu_clave_secreta', { expiresIn: '24h' });
            res.status(201).json({ message: 'Usuario registrado con éxito', userId: user._id, token });
        })
        .catch(err => res.status(500).send('Error al registrar el usuario'));
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Usuario no encontrado');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const token = jwt.sign({ id: user._id }, 'tu_clave_secreta', { expiresIn: '24h' });
            res.json({ token, userId: user._id });
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});


app.listen(PORT, () => {
    console.log(`Servicio de Usuarios corriendo en http://localhost:${PORT}`);
});
