import axios from 'axios';

const idAdministrador = 1; // Cambia por el admin logueado

// Listar todas las reservas
export const getReservas = async () => {
  const res = await axios.get('/reservas');
  return res.data;
};

// Crear reserva
export const crearReserva = async (reserva) => {
  const res = await axios.post(`/reservas?idAdministrador=${idAdministrador}`, reserva);
  return res.data;
};

// Eliminar reserva
export const eliminarReserva = async (id) => {
  await axios.delete(`/reservas/${id}?idAdministrador=${idAdministrador}`);
};

// Actualizar estado de reserva
export const actualizarEstadoReserva = async (id, estado) => {
  const res = await axios.patch(`/reservas/${id}/estado?idAdministrador=${idAdministrador}&estado=${estado}`);
  return res.data;
};
