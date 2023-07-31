import axios, { AxiosResponse } from 'axios';
import $api from './api';
import urls from './urls';

export const register = (email: string, password: string, bio: string): Promise<AxiosResponse> => {
  return $api.post('/registration', { email, password, bio });
};
export const login = (email: string, password: string): Promise<AxiosResponse> => {
  return $api.post('/login', { email, password });
};
export const logout = (): Promise<void> => {
  return $api.post('/logout');
};
export const getAllCharacters = async () => {
  const resp = await axios.get(`${urls.RICK_AND_MORTY_URL}/character`);
  return resp.data;
};
export const getPageWithCharacters = async (pageUrl: string) => {
  const resp = await axios.get(`${pageUrl}`);
  return resp.data;
};
export const getOneCharacter = async (id: string) => {
  const resp = await axios.get(`${urls.RICK_AND_MORTY_URL}/character/${id}`);
  return resp.data;
};
