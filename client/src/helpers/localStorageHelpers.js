export default {
    saveToken(accessToken) {
        localStorage.setItem('token', JSON.stringify(accessToken))
    },
    getToken() {
        return JSON.parse(localStorage.getItem('token'))
    },
    removeToken() {
        localStorage.removeItem('token')
    }
}
