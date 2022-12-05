import axios from 'axios';
import urls from './urls';

const $api = axios.create({
  withCredentials:true,
  baseURL:urls.API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  console.log(config)
  return config
})
export default $api;

