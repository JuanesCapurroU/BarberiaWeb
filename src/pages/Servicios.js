import React, { useEffect, useState } from 'react';
import {
  getServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} from '../services/servicios';

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({
    nombreServicio: '', descripcion: '', fotoUrl: '', precio: ''
  });
  const [editando, setEditando] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [servicioAEliminar, setServicioAEliminar] = useState(null);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      const data = await getServicios();
      setServicios(data);
    } catch (error) {
      alert('Error al cargar servicios');
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editando) {
        await actualizarServicio(editando.idServicio, form);
        setEditando(null);
      } else {
        await crearServicio(form);
      }
      setForm({ nombreServicio: '', descripcion: '', fotoUrl: '', precio: '' });
      cargarServicios();
    } catch {
      alert('Error al guardar servicio');
    }
  };

  const handleEditar = servicio => {
    setEditando(servicio);
    setForm({
      nombreServicio: servicio.nombreServicio || '',
      descripcion: servicio.descripcion || '',
      fotoUrl: servicio.fotoUrl || '',
      precio: servicio.precio || ''
    });
  };

  const handleEliminar = id => {
    setServicioAEliminar(id);
    setShowConfirm(true);
  };

  const confirmarEliminar = async () => {
    await eliminarServicio(servicioAEliminar);
    setShowConfirm(false);
    setServicioAEliminar(null);
    cargarServicios();
  };

  const handleCancelar = () => {
    setEditando(null);
    setForm({ nombreServicio: '', descripcion: '', fotoUrl: '', precio: '' });
  };

  return (
    <div style={{ maxWidth: 950, margin: 'auto' }}>
      <h3 style={{ color: '#0057b7', marginBottom: 24 }}>Servicios</h3>
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
        <input name="nombreServicio" placeholder="Nombre" value={form.nombreServicio} onChange={handleChange} required style={inputStyle} />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} style={inputStyle} />
        <input name="fotoUrl" placeholder="Foto URL" value={form.fotoUrl} onChange={handleChange} style={inputStyle} />
        <input name="precio" placeholder="Precio" type="number" min="0" step="0.01" value={form.precio} onChange={handleChange} required style={inputStyle} />
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
              <th style={thStyle}>Descripción</th>
              <th style={thStyle}>Foto</th>
              <th style={thStyle}>Precio</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {[...servicios]
              .sort((a, b) => a.idServicio - b.idServicio)
              .map(servicio => (
                <tr key={servicio.idServicio} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tdStyle}>{servicio.idServicio}</td>
                  <td style={tdStyle}>{servicio.nombreServicio}</td>
                  <td style={tdStyle}>{servicio.descripcion}</td>
                  <td style={tdStyle}>
                    {servicio.fotoUrl &&
                      <img src={servicio.fotoUrl} alt="foto" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
                    }
                  </td>
                  <td style={tdStyle}>${servicio.precio}</td>
                  <td style={tdStyle}>
                    <button onClick={() => handleEditar(servicio)} style={iconBtnStyle} title="Editar">
                      <span role="img" aria-label="Editar">✏️</span>
                    </button>
                    <button onClick={() => handleEliminar(servicio.idServicio)} style={iconBtnDeleteStyle} title="Eliminar">
                      <span role="img" aria-label="Eliminar">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            {servicios.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 24, color: '#888' }}>
                  No hay servicios registrados.
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
            <h4 style={{ marginBottom: 18 }}>¿Estás seguro de eliminar este servicio?</h4>
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

export default Servicios;
