import axios from 'axios';

const idAdministrador = 1;

export const getServicios = async () => {
  const res = await axios.get('/servicios');
  return res.data;
};

export const crearServicio = async (servicio) => {
  const res = await axios.post(`/servicios?idAdministrador=${idAdministrador}`, servicio);
  return res.data;
};

export const actualizarServicio = async (id, servicio) => {
   const res = await axios.put(`/servicios/${id}?idAdministrador=${idAdministrador}`, servicio);
  return res.data;
};


export const eliminarServicio = async (id) => {
  await axios.delete(`/servicios/${id}?idAdministrador=${idAdministrador}`);
};
