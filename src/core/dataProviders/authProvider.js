import get from "lodash/get";
import jwt from "jsonwebtoken";
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';

import { token, domainName } from "../token";

const OLD_PATIENT_DELAY = 1000;
const NEW_PATIENT_DELAY = 5000;

const url = domainName + '/api/initialise';
let options = {};
if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
}
options.headers = {
    'X-Requested-With': "XMLHttpRequest",
};

const FetchLogin = (resolve, reject) => {
    fetch(url, options)
        .then(res => res.json())
        .then(response => {
            if (get(response, 'status', null) !== 'loading_data') {
                const decodeToken = jwt.decode(token);
                const userName = get(decodeToken, 'openid.firstName', null) + ' ' + get(decodeToken, 'openid.lastName', null);
                const role = ('phrUser' === get(decodeToken, 'openid.role', null)) ? 'PHR' : 'IDCR';
                const nhsNumber = decodeToken.nhsNumber;
                localStorage.setItem('userId', nhsNumber);
                localStorage.setItem('username', userName);
                localStorage.setItem('role', role);
                if (role === 'PHR') {
                    localStorage.setItem('patientId', nhsNumber);
                }
                return resolve(true);
            }
            const isNewPatient = get(response, 'new_patient', false);
            const delay = isNewPatient ? NEW_PATIENT_DELAY : OLD_PATIENT_DELAY;
            setTimeout(() => FetchLogin(resolve, reject), delay);
        });
};

export default async (type, params) => {

    if (type === AUTH_LOGOUT) {
        if (localStorage.getItem('userId') && token) {
            const urlLogout = domainName + '/api/logout';
            fetch(urlLogout, options)
                .then(res => res.json())
                .then(response => {
                    document.cookie = 'JSESSIONID=;';
                    localStorage.removeItem('userId');
                    localStorage.removeItem('patientId');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                    window.location = get(response, 'redirectURL', '');
                });
        }
        return Promise.resolve();
    }

    if (type === AUTH_ERROR) {
        return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
        if (localStorage.getItem('userId') && token) {
            return Promise.resolve();
        } else if (token) {
            new Promise(FetchLogin).then(res => {
                window.location.href = '/';
            });
        }
        return Promise.reject();
    }

    return Promise.reject("Wrong login or password");
};