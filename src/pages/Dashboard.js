import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Administradores from './Administradores';
import Barberos from './Barberos';
import Reservas from './Reservas';
import Servicios from './Servicios';

const sidebarItems = [
  { key: 'administradores', label: 'Administradores' },
  { key: 'barberos', label: 'Barberos' },
  { key: 'servicios', label: 'Servicios' },
  { key: 'reservas', label: 'Reservas' }
];

function Dashboard() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('administradores');

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa' }}>
      {/* Sidebar */}
      <aside style={{
        width: 210,
        background: 'linear-gradient(180deg, #0057b7 0%, #ffd700 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingTop: 32,
        boxShadow: '2px 0 8px rgba(0,0,0,0.08)',
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <img
            src={require('../images/logo_barberia.png')}
            alt="Logo barbería"
            style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'contain', marginBottom: 8 }}
          />
          <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>Barbería Admin</div>
        </div>
        {sidebarItems.map(item => (
          <button
            key={item.key}
            onClick={() => setSelected(item.key)}
            style={{
              background: selected === item.key ? 'rgba(255,255,255,0.18)' : 'none',
              border: 'none',
              color: '#fff',
              fontWeight: 600,
              fontSize: 17,
              padding: '14px 0',
              cursor: 'pointer',
              textAlign: 'left',
              paddingLeft: 32,
              transition: 'background 0.2s',
              outline: 'none'
            }}
          >
            {item.label}
          </button>
        ))}
        {/* Espacio flexible para empujar el botón hacia abajo */}
        <div style={{ flex: 1 }} />
        <div style={{
          padding: '0 24px 24px 24px'
        }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              background: '#fff',
              color: '#0057b7',
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              borderRadius: 7,
              padding: '10px 0',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main style={{
        flex: 1,
        padding: '40px 28px',
        background: '#f6f8fa',
        minHeight: '100vh'
      }}>
        {selected === 'administradores' && <Administradores />}
        {selected === 'barberos' && <Barberos />}
        {selected === 'servicios' && <Servicios />}
        {selected === 'reservas' && <Reservas />}
      </main>
    </div>
  );
}

export default Dashboard;
