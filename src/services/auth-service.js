import $api from '../http';

export default class AuthService {
    static async register(email, password) {
        return await $api.post('/register', { email, password });
    }

    static async login(email, password) {
        return await $api.post('/login', { email, password });
    }

    static async logout() {
        return await $api.post('/logout');
    }
}
