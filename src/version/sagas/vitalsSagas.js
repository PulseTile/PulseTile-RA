import { takeEvery, put } from 'redux-saga/effects';

import { token, domainName } from "../../core/token";
import { VITALS_ACTION, vitalsAction } from "../actions/vitalsAction";

const patientID = localStorage.getItem('patientId') ? localStorage.getItem('patientId') : localStorage.getItem('userId');

const createNewItem = takeEvery(VITALS_ACTION.CREATE, function*(action) {
    const url = domainName + '/api/patients/' + patientID + '/vitalsigns';
    let options = {};
    options.method = 'POST';
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
        'X-Requested-With': "XMLHttpRequest",
        'Content-Type': 'application/json'
    };
    options.body = JSON.stringify(action.data);
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(vitalsAction.success(result))
    } catch(e) {
        yield put(vitalsAction.error(e))
    }
});

export default [
    createNewItem,
];