import axios from 'axios';

// ? Se crea la direccion para enviar el form al backend por medio de peticion axios
const api = 'http://localhost:4000/api';
export const registerRequest = user => axios.post(`${api}/person`, user);