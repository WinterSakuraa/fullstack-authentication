import { makeAutoObservable } from 'mobx';
import AuthService from '../services/auth-service';
import axios from 'axios';
import { API_URL } from '../http';

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuth(isAuth) {
        this.isAuth = isAuth;
    }

    setUser(user) {
        this.user = user;
    }

    setIsLoading(isLoading) {
        this.isLoading = isLoading;
    }

    async register(email, password) {
        try {
            const res = await AuthService.register(email, password);
            localStorage.setItem('token', res.data.accessToken);
            this.setIsAuth(true);
            this.setUser(res.data.user);
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async login(email, password) {
        try {
            const res = await AuthService.login(email, password);
            localStorage.setItem('token', res.data.accessToken);
            this.setIsAuth(true);
            this.setUser(res.data.user);

            console.log(res);
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async logout() {
        try {
            const res = await AuthService.logout();
            localStorage.removeItem('token');
            this.setIsAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async checkAuth() {
        this.setIsLoading(true);
        try {
            const res = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', res.data.accessToken);
            this.setIsAuth(true);
            this.setUser(res.data.user);
        } catch (e) {
            console.log(e.response?.data);
        } finally {
            this.setIsLoading(false);
        }
    }
}
