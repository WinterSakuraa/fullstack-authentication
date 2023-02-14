import axios from 'axios';

export const API_URL = `http://localhost:5005/api`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (err) => {
        const req = err.config;
        if (err.response.status === 401 && err.config && !err.config._isRetry) {
            req._isRetry = true;
            try {
                const res = await axios.get(`${API_URL}/refresh`,
                    { withCredentials: true });
                localStorage.setItem('token', res.data.accessToken);
                return $api.request(req);
            } catch (e) {
                console.log('User unauthorized');
            }
        }

        throw err
    },
);

export default $api;
