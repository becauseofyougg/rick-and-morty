import axios from 'axios';
import urls from './urls';

const $api = axios.create({
  withCredentials:true,
  baseURL: urls.API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use((config) => {
  return config
}, async error => {
  const originReq = error.config
  if(error.response.status == 401 && error.config) {
    try {
      const response = await axios.get(`${urls.API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken)
      return $api.request(originReq)
    } catch (error) {
      console.log(error)  
    }
  }
  throw error
})
export default $api;

