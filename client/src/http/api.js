import axios from "axios";
import ls from '@/helpers/localStorageHelpers.js'

const API_URL = 'http://localhost:3000/api'

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${ls.getToken()}`
    return config
})

$api.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config

    if (error.response.status == 401 && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get("http://localhost/api/auth/refresh", { withCredentials: true });
            ls.saveToken(response.data.accessToken)
            return $api.request(originalRequest)
        } catch (error) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }

    throw error
})