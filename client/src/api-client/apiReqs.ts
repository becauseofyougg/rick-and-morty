import axios, { AxiosResponse } from 'axios';
import $api from './api';
import urls from './urls';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register(email: string, password: string, bio: string): Promise<AxiosResponse> {
    return $api.post('/registration', { email, password, bio });
  },
  login(email: string, password: string): Promise<AxiosResponse> {
    return $api.post('/login', { email, password });
  },
  logout(): Promise<void> {
    return $api.post('/logout');
  },
  getAllCharacters: async () => {
    const resp = await axios.get(`${urls.RICK_AND_MORTY_URL}/character`);
    return resp.data;
  },
  getPageWithCharacters: async (pageUrl:string) => {
    const resp = await axios.get(`${pageUrl}`);
    return resp.data;
  },
  getOneCharacter: async (id:string) => {
    const resp = await axios.get(`${urls.RICK_AND_MORTY_URL}/character/${id}`);
    return resp.data;
  }
};
