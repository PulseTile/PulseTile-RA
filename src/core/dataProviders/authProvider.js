import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
// import decodeJwt from 'jwt-decode';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        if (username === "ivor.cox@ripple.foundation" && password === "IvorCox1!") {
            localStorage.setItem('userId', "9999999000");
            return Promise.resolve();
        }
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('userId')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject("Wrong login or password");
};
