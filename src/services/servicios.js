import axios from 'axios';

// Cambia este ID por el del admin logueado en tu app
const idAdministrador = 1;

// Listar todos
export const getServicios = async () => {
  const res = await axios.get('/servicios');
  return res.data;
};

// Crear
export const crearServicio = async (servicio) => {
  const res = await axios.post(`/servicios?idAdministrador=${idAdministrador}`, servicio);
  return res.data;
};

// Actualizar (puedes usar el mismo endpoint de crear si no tienes PUT en backend, pero lo ideal es tener PUT)
export const actualizarServicio = async (id, servicio) => {
  // Si tienes un endpoint PUT, úsalo. Si no, puedes usar POST como workaround.
  // Ejemplo con PUT (recomendado):
  const res = await axios.put(`/servicios/${id}?idAdministrador=${idAdministrador}`, servicio);
  return res.data;
};

// Eliminar
export const eliminarServicio = async (id) => {
  await axios.delete(`/servicios/${id}?idAdministrador=${idAdministrador}`);
};
