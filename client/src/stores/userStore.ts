import { action, makeAutoObservable, observable } from "mobx";
import apiReqs from "../api-client/api-reqs";

export default class UserStore {
    @observable user = {};
    @observable isAuth = false;

    constructor () {
        makeAutoObservable(this)
    }

    @action setAuth(isUserAuth: boolean) {
        this.isAuth = isUserAuth;
    }

    @action setUser(user) {
        this.user = user;
    }

    @action async login(email: string, password: string) {
        try {
            const response = await apiReqs.login(email, password)
            sessionStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    @action async logout() {
        try {
            await apiReqs.logout()
            sessionStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    @action async register(email: string, password: string, bio: string) {
        try {
            const response = await apiReqs.register(email, password, bio)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            return response
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
}