import axios from 'axios';


export const getBarberos = async () => {
  const res = await axios.get('/barberos');
  return res.data;
};


export const crearBarbero = async (barbero) => {
  const res = await axios.post('/barberos?idAdministrador=1', barbero); // Cambia el id por el real
  return res.data;
};


export const actualizarBarbero = async (id, barbero) => {
  const res = await axios.put(`/barberos/${id}`, barbero);
  return res.data;
};


export const eliminarBarbero = async (id) => {
  await axios.delete(`/barberos/${id}?idAdministrador=1`); 
};

