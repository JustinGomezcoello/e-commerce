const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Proxy rutas
app.use('/api/users', createProxyMiddleware({ target: 'http://servicio-usuarios:3001', changeOrigin: true }));
app.use('/api/products', createProxyMiddleware({ target: 'http://servicio-productos:3002', changeOrigin: true }));
app.use('/api/orders', createProxyMiddleware({ target: 'http://servicio-pedidos:3003', changeOrigin: true }));

app.get('/', (req, res) => {
  res.send('API Gateway funcionando');
});

app.listen(8080, () => {
  console.log('Gateway activo en http://localhost:8080');
}); 