import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
import { token, domainName } from "../token";

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        if (username === "ivor.cox@ripple.foundation" && password === "IvorCox1!") {
            localStorage.setItem('userId', "9999999000");
            const url = domainName + '/api/user';
            let options = {};
            options.method = "GET";
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
            };

            fetch(url, options)
                .then(response => response.json())
                .then(res => {
                    localStorage.setItem('username', res.given_name + ' ' + res.family_name);
                    localStorage.setItem('role', res.role);
                })
                .catch(e => console.log('Error: ', e));

            return Promise.resolve();
        }
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('given_name');
        localStorage.removeItem('family_name');
        localStorage.removeItem('role');
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
