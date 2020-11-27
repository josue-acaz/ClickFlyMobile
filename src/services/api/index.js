import axios from 'axios';

const api = axios.create({
  baseURL: 'https://flyfast-api.herokuapp.com',
});
//https://flyfast-api.herokuapp.com
export default api;
