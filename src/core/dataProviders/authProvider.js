import { get } from "lodash";
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
import { token, domainName } from "../token";

const OLD_PATIENT_DELAY = 1000;
const NEW_PATIENT_DELAY = 5000;

const url = domainName + '/api/initialise';
let options = {};
options.method = "GET";
if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
}
options.headers = {
    'X-Requested-With': "XMLHttpRequest",
};

const FetchLogin = (resolve, reject) => fetch(url, options)
    .then(res => res.json())
    .then(response => {
        if (get(response, 'status', null) !== 'loading_data') {
            return resolve(true);    // Error like "Uncaught (in promise) TypeError: t is not a function"
        }
        const isNewPatient = get(response, 'new_patient', false);
        const delay = isNewPatient ? NEW_PATIENT_DELAY : OLD_PATIENT_DELAY;
        setTimeout(() => FetchLogin(resolve, reject), delay);
    });

// function getUserInfo() {
//
//     const urlUser = domainName + '/api/user';
//
//     let optionsUser = {};
//     optionsUser.method = "GET";
//     if (!optionsUser.headers) {
//         optionsUser.headers = new Headers({ Accept: 'application/json' });
//     }
//     optionsUser.headers = {
//         Authorization: "Bearer " + token,
//         'X-Requested-With': "XMLHttpRequest",
//     };
//
//     return fetch(urlUser, optionsUser)
//         .then(res => res.json())
//         .then(response => {
//             console.log('USER INFO: ', response);
//             return response;
//         });
// }

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

        console.log('------------------------------------------------');
        console.log('userId', localStorage.getItem('userId'));
        console.log('token', token);


        if (localStorage.getItem('userId') && token) {
            return Promise.resolve();
        } else if (token) {

            const FetchInitialize = new Promise((resolve, reject) => FetchLogin(resolve, reject))
                .then(res => {
                    console.log('***********************************');

                });

        }
        return Promise.reject();

        // return localStorage.getItem('userId') ? Promise.resolve() : Promise.reject();
    }

    return Promise.reject("Wrong login or password");
};
