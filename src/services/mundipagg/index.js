import base64 from 'react-native-base64';
import axios from 'axios';

const mundipagg = axios.create({
  baseURL: 'https://api.mundipagg.com/core/v1',
});

mundipagg.interceptors.request.use((config) => {
  config.headers.Authorization = `Basic ${base64.encode(
    'sk_test_4qPp7JWsllfO1Doy:',
  )}`;
  return config;
});

export default mundipagg;
