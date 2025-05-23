import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // importa tu componente
import Administradores from './Administradores';
import Barberos from './Barberos';
import Reservas from './Reservas';
import Servicios from './Servicios';
import AnalisisVentas from './AnalisisVentas';

// ...otros imports

function Dashboard() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa' }}>
      <Sidebar selected={selected} setSelected={setSelected} handleLogout={handleLogout} />
      <main style={{
        flex: 1,
        padding: '40px 28px',
        background: '#f6f8fa',
        minHeight: '100vh'
      }}>
        {selected === 'dashboard' && (
  <div
    style={{
      maxWidth: 700,
      margin: '0 auto 32px auto',
      background: '#fff',
      borderRadius: 14,
      boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
      padding: 32,
      textAlign: 'center'
    }}
  >
    <h2 style={{ color: '#0057b7', marginBottom: 16 }}>Bienvenido al Panel de Administración de Barbería KALU</h2>
    <p style={{ fontSize: 18, color: '#444', marginBottom: 24 }}>
      Esta plataforma web te permite gestionar de manera eficiente todos los aspectos de la barbería: 
      <b> administradores, barberos, servicios, reservas y análisis de ventas</b>. 
      El panel está diseñado para ser intuitivo, rápido y seguro, facilitando la administración diaria del negocio.
    </p>
    <div style={{ margin: '32px 0' }}>
      <img
        src={require('../images/logo_barberia.png')}
        alt="Logo Barbería"
        style={{ width: 200, height: 200, borderRadius: 14, marginBottom: 8 }}
      />
    </div>
    <p style={{ fontSize: 16, color: '#666', marginBottom: 0 }}>
      <b>Desarrolladores:</b><br />
      Juan Bustos &nbsp;|&nbsp; Juan Capurro
    </p>
    <p style={{ fontSize: 14, color: '#aaa', marginTop: 8 }}>
      &copy; {new Date().getFullYear()} Barbería KALU. Todos los derechos reservados.
    </p>
  </div>
)}

        {selected === 'analisis' && <AnalisisVentas />}
        {selected === 'administradores' && <Administradores />}
        {selected === 'barberos' && <Barberos />}
        {selected === 'servicios' && <Servicios />}
        {selected === 'reservas' && <Reservas />}
      </main>
    </div>
  );
}

export default Dashboard;
