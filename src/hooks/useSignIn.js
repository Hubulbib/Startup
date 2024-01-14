import axios from "axios"

export async function useSignIn(login, password) {
    if (!login && password) return

    axios
        .post("http://localhost:3000/api/auth/sign-in", {
            email: login.value,
            password: password.value,
        })
        .then((r) => {
            localStorage.setItem('logged', JSON.stringify(r.data))
        })
        .catch((error) => {
            console.log(error);
        });
}