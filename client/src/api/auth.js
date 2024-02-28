import axios from 'axios';

// ? Se crea la direccion para enviar el form al backend por medio de peticion axios
const api = 'http://localhost:4000/api';
// export const registerRequest = user => axios.post(`${api}/person`, user);
export const registerRequest = async (user) => {
  try {
    const res = await axios.post(`${api}/person`, user);
    console.log(res.data.body.insertId)
    return res.data.body.insertId;
  } catch (error) {
    throw new Error(error);
  }
}
export const createPassword = async (pass) => {
  try {
    const res = await axios.post(`${api}/auth`, pass);
    console.log(`response of createPassword: ${res}`);
    return res;
  } catch (error) {
    throw new Error(error);
  }
} 