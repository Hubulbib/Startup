export default {
    saveUser(user) {
        localStorage.setItem('user', JSON.stringify(user))
    },
    saveToken(accessToken) {
        localStorage.setItem('token', JSON.stringify(accessToken))
    },
    getUser() {
        return JSON.parse(localStorage.getItem('user'))
    },
    getToken() {
        return JSON.parse(localStorage.getItem('token'))
    },
    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
}