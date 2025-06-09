const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de proxies para cada servicio
const userServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users/register': '/register',
    '^/api/users/login': '/login',
    '^/api/users/profile': '/profile',
    '^/api/users': '/'
  }
});

const productServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/products': '/products'
  }
});

const orderServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
  pathRewrite: {
    '^/api/orders': '/orders'
  }
});

// Rutas proxy
app.use('/api/users', userServiceProxy);
app.use('/api/products', productServiceProxy);
app.use('/api/orders', orderServiceProxy);

app.get('/', (req, res) => {
  res.send('API Gateway funcionando');
});

app.listen(8080, () => {
  console.log('Gateway activo en http://localhost:8080');
}); 