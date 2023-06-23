import http from "../Utils/Http";

const login = (data: any) => {
    return http.post('/login', data, {
        transformResponse: [(result: any) => {
            const parsed = JSON.parse(result);
            localStorage.setItem('authUser', JSON.stringify(parsed));
            return parsed;
        }]
    });
}

const register = (data: any) => {
    return http.post('/register', data);
}

const profile = () => {
    return http.get('/user', null);
}

const logout = () => {
    return http.get('/logout', null, {
        transformResponse: [(result: any) => {
            localStorage.removeItem('authUser');
            return JSON.parse(result);
        }]
    });
}

const getAuthUser = () => {
    const item = localStorage.getItem('authUser');
    if (item) return JSON.parse(item);
}  

const methods = { 
    login,
    register,
    profile,
    logout,
    getAuthUser
}

export default methods;