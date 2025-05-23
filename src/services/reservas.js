import axios from 'axios';

const idAdministrador = 1; 

export const getReservas = async () => {
  const res = await axios.get('/reservas');
  return res.data;
};

export const crearReserva = async (reserva) => {
  const res = await axios.post(`/reservas?idAdministrador=${idAdministrador}`, reserva);
  return res.data;
};

export const eliminarReserva = async (id) => {
  await axios.delete(`/reservas/${id}?idAdministrador=${idAdministrador}`);
};

export const actualizarEstadoReserva = async (id, estado) => {
  const res = await axios.patch(`/reservas/${id}/estado?idAdministrador=${idAdministrador}&estado=${estado}`);
  return res.data;
};
