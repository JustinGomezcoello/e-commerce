const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const port = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola Mundo con Microservicios!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
