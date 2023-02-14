import $api from '../http';

export default class UserService {
    static async fetchUsers() {
        return await $api.get('/users');
    }
}
