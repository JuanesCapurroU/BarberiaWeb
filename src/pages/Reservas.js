import React, { useEffect, useState } from 'react';
import { getReservas, crearReserva, eliminarReserva, actualizarEstadoReserva } from '../services/reservas';
import { getBarberos } from '../services/barberos';
import { getServicios } from '../services/servicios';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({
    servicio: '', barbero: '', horarioDisponible: '', cliente: '', nombreCliente: '', celularCliente: '', correoCliente: '', estado: ''
  });
  const [editando, setEditando] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [reservaAEliminar, setReservaAEliminar] = useState(null);

  useEffect(() => {
    cargarReservas();
    cargarBarberos();
    cargarServicios();
  }, []);

  const cargarReservas = async () => {
    setReservas(await getReservas());
  };
  const cargarBarberos = async () => {
    setBarberos(await getBarberos());
  };
  const cargarServicios = async () => {
    setServicios(await getServicios());
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Debes armar el objeto reserva con las relaciones correctas
      const reserva = {
        servicio: { idServicio: form.servicio },
        barbero: { idBarbero: form.barbero },
        horarioDisponible: { idHorario: form.horarioDisponible },
        nombreCliente: form.nombreCliente,
        celularCliente: form.celularCliente,
        correoCliente: form.correoCliente,
        estado: form.estado
      };
      await crearReserva(reserva);
      setForm({ servicio: '', barbero: '', horarioDisponible: '', nombreCliente: '', celularCliente: '', correoCliente: '', estado: '' });
      cargarReservas();
    } catch {
      alert('Error al guardar reserva');
    }
  };

  const handleEliminar = id => {
    setReservaAEliminar(id);
    setShowConfirm(true);
  };

  const confirmarEliminar = async () => {
    await eliminarReserva(reservaAEliminar);
    setShowConfirm(false);
    setReservaAEliminar(null);
    cargarReservas();
  };

  // Puedes agregar handleEditar y handleActualizarEstado si lo deseas

  return (
    <div style={{ maxWidth: 1100, margin: 'auto' }}>
      <h3 style={{ color: '#0057b7', marginBottom: 24 }}>Reservas</h3>
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
        <select name="servicio" value={form.servicio} onChange={handleChange} required style={inputStyle}>
          <option value="">Servicio</option>
          {servicios.map(s => <option key={s.idServicio} value={s.idServicio}>{s.nombreServicio}</option>)}
        </select>
        <select name="barbero" value={form.barbero} onChange={handleChange} required style={inputStyle}>
          <option value="">Barbero</option>
          {barberos.map(b => <option key={b.idBarbero} value={b.idBarbero}>{b.nombre}</option>)}
        </select>
        {/* Aquí deberías cargar horarios disponibles según barbero y fecha */}
        <input name="horarioDisponible" placeholder="ID Horario" value={form.horarioDisponible} onChange={handleChange} required style={inputStyle} />
        <input name="nombreCliente" placeholder="Nombre Cliente" value={form.nombreCliente} onChange={handleChange} required style={inputStyle} />
        <input name="celularCliente" placeholder="Celular Cliente" value={form.celularCliente} onChange={handleChange} required style={inputStyle} />
        <input name="correoCliente" placeholder="Correo Cliente" value={form.correoCliente} onChange={handleChange} required style={inputStyle} />
        <select name="estado" value={form.estado} onChange={handleChange} required style={inputStyle}>
          <option value="">Estado</option>
          <option value="CONFIRMADA">CONFIRMADA</option>
          <option value="CANCELADA">CANCELADA</option>
          <option value="PENDIENTE">PENDIENTE</option>
        </select>
        <button type="submit" style={btnCrear}>Crear</button>
      </form>

      {/* Tabla */}
      <div style={{
        overflowX: 'auto',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
        background: '#fff'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
          <thead>
            <tr style={{
              background: 'linear-gradient(90deg, #0057b7 0%, #ffd700 100%)',
              color: '#fff'
            }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Servicio</th>
              <th style={thStyle}>Barbero</th>
              <th style={thStyle}>Horario</th>
              <th style={thStyle}>Cliente</th>
              <th style={thStyle}>Celular</th>
              <th style={thStyle}>Correo</th>
              <th style={thStyle}>Estado</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {[...reservas]
              .sort((a, b) => a.idReserva - b.idReserva)
              .map(reserva => (
                <tr key={reserva.idReserva} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tdStyle}>{reserva.idReserva}</td>
                  <td style={tdStyle}>{reserva.servicio?.nombreServicio}</td>
                  <td style={tdStyle}>{reserva.barbero?.nombre}</td>
                  <td style={tdStyle}>{reserva.horarioDisponible?.horaInicio}</td>
                  <td style={tdStyle}>{reserva.nombreCliente}</td>
                  <td style={tdStyle}>{reserva.celularCliente}</td>
                  <td style={tdStyle}>{reserva.correoCliente}</td>
                  <td style={tdStyle}>{reserva.estado}</td>
                  <td style={tdStyle}>
                    {/* Puedes agregar aquí editar/actualizar estado */}
                    <button onClick={() => handleEliminar(reserva.idReserva)} style={iconBtnDeleteStyle} title="Eliminar">
                      <span role="img" aria-label="Eliminar">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            {reservas.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: 24, color: '#888' }}>
                  No hay reservas registradas.
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
            <h4 style={{ marginBottom: 18 }}>¿Estás seguro de eliminar esta reserva?</h4>
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

const iconBtnDeleteStyle = {
  background: 'none',
  border: 'none',
  color: '#d32f2f',
  fontSize: 20,
  cursor: 'pointer',
  marginRight: 8
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

export default Reservas;
