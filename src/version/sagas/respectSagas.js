import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import {domainName, token} from "../../core/token";
import { VERSIONS_SERVER_ACTION, versionsServerAction } from "../actions/ReSPECT/versionsServerAction";
import { httpErrorAction } from '../../core/actions/httpErrorAction';

const getVersionsList = takeEvery(VERSIONS_SERVER_ACTION.REQUEST, function*(action) {
    const url = domainName + '/api/patients/' + localStorage.getItem('patientId') + '/respectforms';
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        'X-Requested-With': "XMLHttpRequest",
        Authorization: "Bearer " + token,
    };

    let responseInfo = {};
    try {
        const result = yield fetch(url, options)
            .then(res => {
                responseInfo.status = get(res, 'status', null);
                return res.json()
            })
            .then(res => {
                if (responseInfo.status !== 200) {
                    responseInfo.errorMessage = get(res, 'error', null);
                    return false;
                }
                return res;
            });
        if (responseInfo.status === 200) {
            yield put(versionsServerAction.success(result))
        } else {
            yield put(httpErrorAction.save({
                status: responseInfo.status,
                message: responseInfo.errorMessage
            }));
        }

    } catch(e) {
        yield put(versionsServerAction.error(e))
    }
});

const getVersionById = takeEvery(VERSIONS_SERVER_ACTION.REQUEST_ONE, function*(action) {
    const sourceId = get(action, 'sourceId', null);
    const versionId = get(action, 'versionId', null);
    const url = domainName + '/api/patients/' + localStorage.getItem('patientId') + '/respectforms/' + sourceId + '/' + versionId;
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        'X-Requested-With': "XMLHttpRequest",
        Authorization: "Bearer " + token,
    };

    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(versionsServerAction.successOne(result))
    } catch(e) {
        yield put(versionsServerAction.error(e))
    }
});

const getLatestVersion = takeEvery(VERSIONS_SERVER_ACTION.REQUEST_LATEST, function*(action) {
    const sourceId = get(action, 'sourceId', null);
    const versionId = get(action, 'versionId', null);
    const url = domainName + '/api/patients/' + localStorage.getItem('patientId') + '/respectforms/' + sourceId + '/' + versionId;
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        'X-Requested-With': "XMLHttpRequest",
        Authorization: "Bearer " + token,
    };

    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(versionsServerAction.successLatest(result))
    } catch(e) {
        yield put(versionsServerAction.error(e))
    }
});


const createNewVersion = takeEvery(VERSIONS_SERVER_ACTION.CREATE, function*(action) {
    const url = domainName + '/api/patients/' + localStorage.getItem('patientId') + '/respectforms';
    let options = {};
    options.method = "POST";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        'X-Requested-With': "XMLHttpRequest",
        Authorization: "Bearer " + token,
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(versionsServerAction.successCreate(result))
    } catch(e) {
        yield put(versionsServerAction.error(e))
    }
});

const putOneSection = takeEvery(VERSIONS_SERVER_ACTION.PUT, function*(action) {
    const sourceId = get(action, 'sourceId', null);
    const versionId = get(action, 'versionId', null);
    const versionData = get(action, 'versionData', null);
    const url = domainName + '/api/patients/' + localStorage.getItem('patientId') + '/respectforms/' + sourceId + '/' + versionId;
    let options = {};
    options.method = "PUT";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': "XMLHttpRequest",
        Authorization: "Bearer " + token,
    };
    options.body = JSON.stringify(versionData);

    let responseInfo = {};
    try {
        const result = yield fetch(url, options)
            .then(res => {
                responseInfo.status = get(res, 'status', null);
                return res.json()
            })
            .then(res => {
                if (responseInfo.status !== 200) {
                    responseInfo.errorMessage = get(res, 'error', null);
                    return false;
                }
                return res;
            });

        if (responseInfo.status === 200) {
            yield put(versionsServerAction.successPut(result))
        } else {
            yield put(httpErrorAction.save({
                status: responseInfo.status,
                message: responseInfo.errorMessage
            }));
        }

    } catch(e) {
        yield put(versionsServerAction.error(e))
    }
});

export default [
    getVersionsList,
    getVersionById,
    getLatestVersion,
    createNewVersion,
    putOneSection,
]