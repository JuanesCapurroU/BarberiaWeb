import axios from 'axios';

export const getAdministradores = async () => {
  const res = await axios.get('/api/administradores');
  return res.data;
};


export const crearAdministrador = async (admin) => {
  const res = await axios.post('/api/administradores', admin);
  return res.data;
};


export const actualizarAdministrador = async (id, admin) => {

  const res = await axios.put(`/api/administradores/${id}`, admin);
  return res.data;
};


export const eliminarAdministrador = async (id) => {
  await axios.delete(`/api/administradores/${id}`);
};
