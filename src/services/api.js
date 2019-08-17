import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tecprodbox-backend.herokuapp.com',
  // baseURL: 'http://localhost:9000',
});

export default api;
