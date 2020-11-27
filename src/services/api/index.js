import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.107:3333',
});
//https://flyfast-api.herokuapp.com
export default api;
