import axios from 'axios';
export const getHorariosPorBarbero = async (idBarbero) => {
  const res = await axios.get(`/horarios?barberoId=${idBarbero}`);
  return res.data;
};