import React from 'react';

const sidebarItems = [
  { key: 'dashboard', label: 'Dashboard' },
    { key: 'analisis', label: 'Análisis de Ventas' },
  { key: 'administradores', label: 'Administradores' },
  { key: 'barberos', label: 'Barberos' },
  { key: 'servicios', label: 'Servicios' },
  { key: 'reservas', label: 'Reservas' }
];

function Sidebar({ selected, setSelected, handleLogout }) {
  return (
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
      <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    borderRadius: 50,
    width: 100,
    height: 100,
    margin: '0 auto 8px auto',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '2px solid #ffd700'
  }}
>
  <img
    src={require('../images/logo_barberia.png')}
    alt="Logo barbería"
    style={{
      width: 180,
      height: 180,
      borderRadius: 14,
      objectFit: 'contain',
      background: 'transparent'
    }}
  />
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
  );
}

export default Sidebar;
