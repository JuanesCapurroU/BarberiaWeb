import axios from 'axios';

// Listar todos
export const getAdministradores = async () => {
  const res = await axios.get('/api/administradores');
  return res.data;
};

// Crear
export const crearAdministrador = async (admin) => {
  const res = await axios.post('/api/administradores', admin);
  return res.data;
};

// Actualizar
export const actualizarAdministrador = async (id, admin) => {
  // Tu backend espera el ID como path variable
  const res = await axios.put(`/api/administradores/${id}`, admin);
  return res.data;
};

// Eliminar
export const eliminarAdministrador = async (id) => {
  await axios.delete(`/api/administradores/${id}`);
};
