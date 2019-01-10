import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
// import decodeJwt from 'jwt-decode';

const loginURL = "https://keycloak.dev1.signin.nhs.uk/cicauth/realms/NHS/login-actions/authenticate?code=gkzqDDUX2MXXDPujFC0FUvUs6Pva-BXp_Y_PSRkf6N0&execution=d0845964-2afc-45f4-b45f-097661f7c7d7&client_id=leeds-helm";

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;

        let options = {};
        options.method = "POST";
        options.headers = new Headers({Accept: 'application/json'});
        options.headers = {
            'Content-Type': 'application/json'
        };
        options.body = JSON.stringify({ username: username, password: password });

        console.log('OPTIONS');
        console.log(options)

        return fetch(loginURL, options)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        // ...
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
    }
    return Promise.reject('Unknown method');
};