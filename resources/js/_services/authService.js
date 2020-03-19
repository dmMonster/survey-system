export const authService = {
    login,
    isLogged
};


async function login(email, password) {
    await axios.get('/airlock/csrf-cookie');

    return await axios.post('/api/login', {
        email: email,
        password: password
    })
}

async function isLogged() {
    return await axios.get("/api/isLogged")
};
