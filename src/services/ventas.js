import axios from 'axios';

export const getTotalDiarioBarbero = async (idBarbero, fecha) => {
  const res = await axios.get(`/reservas/barbero/${idBarbero}/total?fecha=${fecha}`);
  return res.data; 
};


export const getBarberos = async () => {
    const res = await axios.get('/barberos');
    return res.data;
  };


export const getServiciosMasVendidos = async (fecha) => {
  const res = await axios.get(`/reservas/servicios-mas-vendidos?fecha=${fecha}`);
  return res.data; 
};
