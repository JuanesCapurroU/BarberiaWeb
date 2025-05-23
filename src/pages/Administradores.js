import React, { useEffect, useState } from 'react';
import {
  getAdministradores,
  crearAdministrador,
  actualizarAdministrador,
  eliminarAdministrador
} from '../services/administradores';

function Administradores() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ nombre: '', usuario: '', contraseña: '', correo: '', rol: 'ADMIN' });
  const [editando, setEditando] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [adminAEliminar, setAdminAEliminar] = useState(null);

  useEffect(() => {
    cargarAdmins();
  }, []);

  const cargarAdmins = async () => {
    try {
      const data = await getAdministradores();
      setAdmins(data);
    } catch (error) {
      alert('Error al cargar administradores');
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editando) {
        await actualizarAdministrador(editando.id_admin, form);
        setEditando(null);
      } else {
        await crearAdministrador(form);
      }
      setForm({ nombre: '', usuario: '', contraseña: '', correo: '', rol: 'ADMIN' });
      cargarAdmins();
    } catch {
      alert('Error al guardar administrador');
    }
  };

  const handleEditar = admin => {
    setEditando(admin);
    setForm({
      nombre: admin.nombre,
      usuario: admin.usuario,
      contraseña: admin.contraseña,
      correo: admin.correo,
      rol: admin.rol
    });
  };

  const handleEliminar = id => {
    setAdminAEliminar(id);
    setShowConfirm(true);
  };

  const confirmarEliminar = async () => {
    await eliminarAdministrador(adminAEliminar);
    setShowConfirm(false);
    setAdminAEliminar(null);
    cargarAdmins();
  };

  const handleCancelar = () => {
    setEditando(null);
    setForm({ nombre: '', usuario: '', contraseña: '', correo: '', rol: 'ADMIN' });
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto' }}>
      <h3 style={{ color: '#0057b7', marginBottom: 24 }}>Administradores</h3>
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
        <input name="usuario" placeholder="Usuario" value={form.usuario} onChange={handleChange} required style={inputStyle} />
        <input name="contraseña" placeholder="Contraseña" value={form.contraseña} onChange={handleChange} required style={inputStyle} />
        <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} required style={inputStyle} />
        <select name="rol" value={form.rol} onChange={handleChange} required style={inputStyle}>
          <option value="ADMIN">ADMIN</option>
          <option value="SUPERADMIN">SUPERADMIN</option>
        </select>
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
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr style={{
              background: 'linear-gradient(90deg, #0057b7 0%, #ffd700 100%)',
              color: '#fff'
            }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Usuario</th>
              <th style={thStyle}>Correo</th>
              <th style={thStyle}>Rol</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
  {[...admins]
    .sort((a, b) => a.id_admin - b.id_admin)
    .map(admin => (
      <tr key={admin.id_admin} style={{ borderBottom: '1px solid #eee' }}>
        <td style={tdStyle}>{admin.id_admin}</td>
        <td style={tdStyle}>{admin.nombre}</td>
        <td style={tdStyle}>{admin.usuario}</td>
        <td style={tdStyle}>{admin.correo}</td>
        <td style={tdStyle}>{admin.rol}</td>
        <td style={tdStyle}>
          <button onClick={() => handleEditar(admin)} style={iconBtnStyle} title="Editar">
            <span role="img" aria-label="Editar">✏️</span>
          </button>
          <button onClick={() => handleEliminar(admin.id_admin)} style={iconBtnDeleteStyle} title="Eliminar">
            <span role="img" aria-label="Eliminar">🗑️</span>
          </button>
        </td>
      </tr>
    ))}
  {admins.length === 0 && (
    <tr>
      <td colSpan={6} style={{ textAlign: 'center', padding: 24, color: '#888' }}>
        No hay administradores registrados.
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
            <h4 style={{ marginBottom: 18 }}>¿Estás seguro de eliminar este administrador?</h4>
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

export default Administradores;
