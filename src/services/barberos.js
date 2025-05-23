import axios from 'axios';

// Listar todos
export const getBarberos = async () => {
  const res = await axios.get('/barberos');
  return res.data;
};

// Crear
export const crearBarbero = async (barbero) => {
  // Si necesitas idAdministrador, pásalo como query param
  const res = await axios.post('/barberos?idAdministrador=1', barbero); // Cambia el id por el real
  return res.data;
};

// Actualizar
export const actualizarBarbero = async (id, barbero) => {
  const res = await axios.put(`/barberos/${id}`, barbero);
  return res.data;
};

// Eliminar
export const eliminarBarbero = async (id) => {
  // Si necesitas idAdministrador, pásalo como query param
  await axios.delete(`/barberos/${id}?idAdministrador=1`); // Cambia el id por el real
};
