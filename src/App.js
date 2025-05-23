import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Barberos from './pages/Barberos';
import Servicios from './pages/Servicios';
import Reservas from './pages/Reservas';
import Administradores from './pages/Administradores';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige la ruta raíz a /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Ruta de login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/barberos" element={<Barberos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/administradores" element={<Administradores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
