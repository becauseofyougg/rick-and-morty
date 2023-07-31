import axios from 'axios';
import { action, makeAutoObservable, observable } from 'mobx';
import urls from '../api-client/urls';
import { IUser } from '../types/api';
import { getAllCharacters, login, logout, register } from '../api-client/apiReqs';

export default class UserStore {
  @observable user: IUser | null = null;
  @observable isAuth = false;
  @observable isLoading = false;
  @observable authError = '';
  @observable characters = null;
  @observable navigation = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action setAuth(isUserAuth: boolean) {
    this.isAuth = isUserAuth;
  }

  @action setAuthError(data: string) {
    this.authError = data;
  }

  @action setUser(user: IUser | null) {
    this.user = user;
  }

  @action toggleLoader(state: boolean) {
    this.isLoading = state;
  }
  @action async handleGetAllCharacters() {
    const resp = await getAllCharacters();
    this.setPageData(resp);
  }

  @action setPageData(resp: any) {
    console.log(resp.data.info);
    this.navigation = resp.data.info;
    this.characters = resp.data.results;
  }

  @action
  async handleLogin(email: string, password: string) {
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (error: any) {
      this.setAuthError(error.response.data.message);
    }
  }

  @action async handleLogout() {
    try {
      await logout();
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('bio');
      this.setAuth(false);
      this.setUser(null);
    } catch (error: any) {
      this.setAuthError(error.response.data.message);
    }
  }

  @action async handleRegister(email: string, password: string, bio: string) {
    try {
      const response = await register(email, password, bio);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (error: any) {
      this.setAuthError(error.response.data.message);
    }
  }

  @action async checkAuth() {
    this.toggleLoader(true);
    try {
      const response = await axios.get(`${urls.API_URL}/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      this.setAuthError(error.response.data.message);
    } finally {
      this.toggleLoader(false);
    }
  }
}
