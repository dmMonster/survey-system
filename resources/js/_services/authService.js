export const authService = {
    login,
    isLogged,
    logout,
    user,
};


async function login(email, password) {
    await axios.get('/airlock/csrf-cookie');

    return await axios.post('/api/login', {
        email: email,
        password: password
    })
}

async function user() {
    return await axios.get('/api/user');
}

async function logout() {
    return await axios.get('/api/logout')
}

async function isLogged() {
    return await axios.get("/api/isLogged")
}
