import axios from "axios";
import ls from '@/helpers/localStorageHelpers.js';

export const API_URL = 'http://localhost:3000/api';

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${ls.getToken()}`
    return config
});
