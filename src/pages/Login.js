import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(usuario, password);
      if (data.success && data.role === "ADMIN") {
        localStorage.setItem('admin', usuario);
        navigate('/dashboard');
      } else {
        setError('No autorizado');
      }
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };


  const inputStyle = {
    width: '100%',
    padding: '10px 38px 10px 12px',
    borderRadius: 7,
    border: '1px solid #b0b0b0',
    fontSize: 16,
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0057b7 0%, #ffd700 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ondas decorativas */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '180px',
        background: 'linear-gradient(90deg, #ffd700 0%, #0057b7 100%)',
        borderBottomLeftRadius: '80px',
        borderBottomRightRadius: '80px',
        zIndex: 1,
        opacity: 0.85
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '140px',
        background: 'linear-gradient(90deg, #0057b7 0%, #ffd700 100%)',
        borderTopLeftRadius: '80px',
        borderTopRightRadius: '80px',
        zIndex: 1,
        opacity: 0.85
      }} />

      <form onSubmit={handleSubmit}
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: '36px 28px 28px 28px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          minWidth: 320,
          maxWidth: 340,
          zIndex: 2,
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <img src={require('../images/logo_barberia.png')} alt="Logo barbería"
            style={{ width: 200, height: 200, borderRadius: 2, objectFit: 'contain' }} />
        </div>
        <h2 style={{
          textAlign: 'center',
          color: '#0057b7',
          fontWeight: 700,
          fontSize: 22,
          marginBottom: 18
        }}>
          Acceso<br />Administrador
        </h2>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          required
          style={inputStyle}
        />
        <div style={{ position: 'relative', marginBottom: 18, marginTop: 14 }}>
          <input
            type={mostrarPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button
            type="button"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            tabIndex={-1}
          >
            <span role="img" aria-label="ver contraseña" style={{ fontSize: 20, color: '#0057b7' }}>
              {mostrarPassword ? '🙈' : '👁️'}
            </span>
          </button>
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #0057b7 0%, #ffd700 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 17,
            border: 'none',
            borderRadius: 7,
            padding: '12px 0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            marginBottom: 6
          }}
        >
          Iniciar sesión
        </button>
        {error && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  );
}

export default Login;
