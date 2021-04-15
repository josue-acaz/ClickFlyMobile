import axios from 'axios';

const api = axios.create({
  baseURL: "https://api.clickfly.app",
});

export default api;
