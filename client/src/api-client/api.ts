import axios from 'axios';
import urls from './urls';

const $api = axios.create({
  withCredentials:true,
  baseURL:urls.API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
  return config
})
export default $api;

