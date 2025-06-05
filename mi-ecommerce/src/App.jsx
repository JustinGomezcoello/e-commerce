import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ProductList from './components/products/ProductList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/PrivateRoute';
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          {/* Página principal - Catálogo de productos */}
          <Route path="/" element={<ProductList />} />

          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <div>Carrito de Compras</div>
              </PrivateRoute>
            }
          />

          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 