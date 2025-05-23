import React, { useEffect, useState } from 'react';
import {
  getBarberos,
  crearBarbero,
  actualizarBarbero,
  eliminarBarbero
} from '../services/barberos';

function Barberos() {
  const [barberos, setBarberos] = useState([]);
  const [form, setForm] = useState({
    nombre: '', estado: '', correo: '', telefono: '', usuario: '', contraseña: '', fotoUrl: ''
  });
  const [editando, setEditando] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [barberoAEliminar, setBarberoAEliminar] = useState(null);

  useEffect(() => {
    cargarBarberos();
  }, []);

  const cargarBarberos = async () => {
    try {
      const data = await getBarberos();
      setBarberos(data);
    } catch (error) {
      alert('Error al cargar barberos');
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editando) {
        await actualizarBarbero(editando.idBarbero, form);
        setEditando(null);
      } else {
        await crearBarbero(form);
      }
      setForm({
        nombre: '', estado: '', correo: '', telefono: '', usuario: '', contraseña: '', fotoUrl: ''
      });
      cargarBarberos();
    } catch {
      alert('Error al guardar barbero');
    }
  };

  const handleEditar = barbero => {
    setEditando(barbero);
    setForm({
      nombre: barbero.nombre || '',
      estado: barbero.estado || '',
      correo: barbero.correo || '',
      telefono: barbero.telefono || '',
      usuario: barbero.usuario || '',
      contraseña: barbero.contraseña || '',
      fotoUrl: barbero.fotoUrl || ''
    });
  };

  const handleEliminar = id => {
    setBarberoAEliminar(id);
    setShowConfirm(true);
  };

  const confirmarEliminar = async () => {
    await eliminarBarbero(barberoAEliminar);
    setShowConfirm(false);
    setBarberoAEliminar(null);
    cargarBarberos();
  };

  const handleCancelar = () => {
    setEditando(null);
    setForm({
      nombre: '', estado: '', correo: '', telefono: '', usuario: '', contraseña: '', fotoUrl: ''
    });
  };

  return (
    <div style={{ maxWidth: 950, margin: 'auto' }}>
      <h3 style={{ color: '#0057b7', marginBottom: 24 }}>Barberos</h3>
      {/* Formulario */}
      <form onSubmit={handleSubmit}
        style={{
          marginBottom: 24,
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
          background: '#fff',
          borderRadius: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          padding: 18
        }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required style={inputStyle} />
        <input name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} style={inputStyle} />
        <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} style={inputStyle} />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} style={inputStyle} />
        <input name="usuario" placeholder="Usuario" value={form.usuario} onChange={handleChange} style={inputStyle} />
        <input name="contraseña" placeholder="Contraseña" value={form.contraseña} onChange={handleChange} style={inputStyle} />
        <input name="fotoUrl" placeholder="Foto URL" value={form.fotoUrl} onChange={handleChange} style={inputStyle} />
        <button type="submit" style={editando ? btnActualizar : btnCrear}>
          {editando ? 'Actualizar' : 'Crear'}
        </button>
        {editando && (
          <button type="button" onClick={handleCancelar} style={btnCancelar}>Cancelar</button>
        )}
      </form>

      {/* Tabla */}
      <div style={{
        overflowX: 'auto',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
        background: '#fff'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
          <thead>
            <tr style={{
              background: 'linear-gradient(90deg, #0057b7 0%, #ffd700 100%)',
              color: '#fff'
            }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Estado</th>
              <th style={thStyle}>Correo</th>
              <th style={thStyle}>Teléfono</th>
              <th style={thStyle}>Usuario</th>
              <th style={thStyle}>Foto</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {[...barberos]
              .sort((a, b) => a.idBarbero - b.idBarbero)
              .map(barbero => (
                <tr key={barbero.idBarbero} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tdStyle}>{barbero.idBarbero}</td>
                  <td style={tdStyle}>{barbero.nombre}</td>
                  <td style={tdStyle}>{barbero.estado}</td>
                  <td style={tdStyle}>{barbero.correo}</td>
                  <td style={tdStyle}>{barbero.telefono}</td>
                  <td style={tdStyle}>{barbero.usuario}</td>
                  <td style={tdStyle}>
                    {barbero.fotoUrl &&
                      <img src={barbero.fotoUrl} alt="foto" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
                    }
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => handleEditar(barbero)} style={iconBtnStyle} title="Editar">
                      <span role="img" aria-label="Editar">✏️</span>
                    </button>
                    <button onClick={() => handleEliminar(barbero.idBarbero)} style={iconBtnDeleteStyle} title="Eliminar">
                      <span role="img" aria-label="Eliminar">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            {barberos.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 24, color: '#888' }}>
                  No hay barberos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h4 style={{ marginBottom: 18 }}>¿Estás seguro de eliminar este barbero?</h4>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <button onClick={confirmarEliminar} style={btnEliminar}>Sí, eliminar</button>
              <button onClick={() => setShowConfirm(false)} style={btnCancelar}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- ESTILOS ---

const inputStyle = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #b0b0b0',
  fontSize: 15,
  minWidth: 120
};

const thStyle = {
  padding: 12,
  fontWeight: 700,
  fontSize: 16,
  border: 'none'
};

const tdStyle = {
  padding: 10,
  fontSize: 15,
  textAlign: 'center',
  background: '#fff',
  border: 'none'
};

const iconBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#0057b7',
  fontSize: 20,
  cursor: 'pointer',
  marginRight: 8
};

const iconBtnDeleteStyle = {
  ...iconBtnStyle,
  color: '#d32f2f'
};

const btnCrear = {
  background: 'linear-gradient(90deg, #0057b7 0%, #ffd700 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 7,
  padding: '8px 18px',
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer'
};

const btnActualizar = {
  ...btnCrear,
  background: 'linear-gradient(90deg, #ffd700 0%, #0057b7 100%)'
};

const btnCancelar = {
  background: '#eee',
  color: '#222',
  border: 'none',
  borderRadius: 7,
  padding: '8px 18px',
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer'
};

const btnEliminar = {
  background: '#d32f2f',
  color: '#fff',
  border: 'none',
  borderRadius: 7,
  padding: '8px 18px',
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer'
};

const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.18)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalContent = {
  background: '#fff',
  borderRadius: 14,
  padding: '32px 28px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
  textAlign: 'center',
  minWidth: 300
};

export default Barberos;
