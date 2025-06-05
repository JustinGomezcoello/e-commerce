import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ProductList from './components/products/ProductList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/PrivateRoute';
import { isAuthenticated } from './utils/auth';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Página principal - Catálogo de productos */}
            <Route path="/" element={<ProductList />} />

            {/* Rutas de autenticación */}
            <Route 
              path="/login" 
              element={
                isAuthenticated() ? <Navigate to="/" /> : <Login />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated() ? <Navigate to="/" /> : <Register />
              } 
            />

            {/* Rutas protegidas */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <div>Shopping Cart</div>
                </PrivateRoute>
              }
            />

            {/* Ruta 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 