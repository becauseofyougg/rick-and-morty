import axios from 'axios';
import { action, makeAutoObservable, observable } from 'mobx';
import urls from '../api-client/urls';
import { IUser } from '../types/api';
import apiReqs from '../api-client/api-reqs';

export default class UserStore {
  @observable user: IUser = null;
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

  @action setUser(user: IUser) {
    this.user = user;
  }

  @action toggleLoader(state: boolean) {
    this.isLoading = state;
  }
  //   @action async getAllCharacters() {
  //     const resp = await apiReqs.getAllCharacters();
  //     this.setPageData(resp);
  //   }

  //   @action setPageData(resp) {
  //     console.log(resp.data.info);
  //     this.navigation = resp.data.info;
  //     this.characters = resp.data.results;
  //   }

  @action
  async login(email: string, password: string) {
    try {
      const response = await apiReqs.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (error) {
      this.setAuthError(error.response.data.message);
    }
  }

  @action async logout() {
    try {
      await apiReqs.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('bio');
      this.setAuth(false);
      this.setUser(null);
    } catch (error) {
      this.setAuthError(error.response.data.message);
    }
  }

  @action async register(email: string, password: string, bio: string) {
    try {
      const response = await apiReqs.register(email, password, bio);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (error) {
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
    } catch (error) {
      this.setAuthError(error.response.data.message);
    } finally {
      this.toggleLoader(false);
    }
  }
}
