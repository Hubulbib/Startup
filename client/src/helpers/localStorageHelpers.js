export default {
    saveToken(accessToken) {
        localStorage.setItem('token', JSON.stringify(accessToken))
    },
    saveUser(user) {
        localStorage.setItem('token', JSON.stringify(user))
    },
    getToken() {
        return JSON.parse(localStorage.getItem('token'))
    },
    getUser() {
        return JSON.parse(localStorage.getItem('user'))
    },
    removeToken() {
        localStorage.removeItem('token')
    }
}
