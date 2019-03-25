import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { domainName } from "../../core/token";
import { VERSIONS_SERVER_ACTION, versionsServerAction } from "../actions/ReSPECT/versionsServerAction";

const patientId = localStorage.getItem('patientId');

const getVersionsList = takeEvery(VERSIONS_SERVER_ACTION.REQUEST, function*(action) {
    const url = domainName + '/api/patients/' + patientId + '/respectforms';
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        'X-Requested-With': "XMLHttpRequest",
    };

    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(versionsServerAction.success(result))
    } catch(e) {
        yield put(versionsServerAction.error(e))
    }
});

const getVersionById = takeEvery(VERSIONS_SERVER_ACTION.REQUEST_ONE, function*(action) {
    const componsitionId = get(action, 'data', null);
    const url = domainName + '/api/patients/' + patientId + '/respectforms/' + componsitionId;
    let options = {};
    options.method = "POST";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        'X-Requested-With': "XMLHttpRequest",
    };

    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(versionsServerAction.successOne(result))
    } catch(e) {
        yield put(versionsServerAction.error(e))
    }
});

const createNewVersion = takeEvery(VERSIONS_SERVER_ACTION.CREATE, function*(action) {
    const url = domainName + '/api/patients/' + patientId + '/respectforms';
    let options = {};
    options.method = "POST";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        'X-Requested-With': "XMLHttpRequest",
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(versionsServerAction.success(result))
    } catch(e) {
        yield put(versionsServerAction.error(e))
    }
});

const putOneSection = takeEvery(VERSIONS_SERVER_ACTION.PUT, function*(action) {
    
    console.log('', );
       
    
    const url = domainName + '/api/patients/' + patientId + '/respectforms/';
    let options = {};
    options.method = "POST";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        'X-Requested-With': "XMLHttpRequest",
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(versionsServerAction.success(result))
    } catch(e) {
        yield put(versionsServerAction.error(e))
    }
});

export default [
    getVersionsList,
    getVersionById,
    createNewVersion,
    putOneSection,
]