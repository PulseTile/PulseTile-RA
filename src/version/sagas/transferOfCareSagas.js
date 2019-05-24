import { takeEvery, put } from 'redux-saga/effects';

import { token, domainName } from "../../core/token";
import { TRANSFER_OF_CARE_ACTION, transferOfCareAction } from "../actions/transferOfCareAction";

const patientID = localStorage.getItem('patientId') ? localStorage.getItem('patientId') : localStorage.getItem('userId');

const createNewItem = takeEvery(TRANSFER_OF_CARE_ACTION.CREATE, function*(action) {
    const url = domainName + '/api/patients/' + patientID + '/events/toc';
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
        yield put(transferOfCareAction.success(result))
    } catch(e) {
        yield put(transferOfCareAction.error(e))
    }
});

const getSelectorsItem = takeEvery(TRANSFER_OF_CARE_ACTION.REQUEST, function*(action) {
    const url = domainName + '/api/patients/' + patientID + '/' + action.data;
    let options = {};
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
        'X-Requested-With': "XMLHttpRequest",
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(transferOfCareAction.list(result))
    } catch(e) {
        yield put(transferOfCareAction.error(e))
    }
});

const getDetails = takeEvery(TRANSFER_OF_CARE_ACTION.REQUEST_ONE, function*(action) {
    const url = domainName + '/api/patients/' + patientID + '/' + action.heading + '/' + action.sourceId;
    let options = {};
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
        'X-Requested-With': "XMLHttpRequest",
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(transferOfCareAction.details(result))
    } catch(e) {
        yield put(transferOfCareAction.error(e))
    }
});

export default [
    createNewItem,
    getSelectorsItem,
    getDetails,
];