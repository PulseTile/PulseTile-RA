import { takeEvery, put } from 'redux-saga/effects';

import { token, domainName } from "../token";

const patientID = localStorage.getItem('patientId') ? localStorage.getItem('patientId') : localStorage.getItem('userId');

export default function createCustomSagas(actionName, actionType, pluginName) {
    return takeEvery(actionName.REQUEST, function*(action) {
        const url = domainName + '/api/patients/' + patientID + '/synopsis/' + pluginName;
        let options = {};
        options.method = "GET";
        if (!options.headers) {
            options.headers = new Headers({Accept: 'application/json'});
        }
        options.headers = {
            Authorization: "Bearer " + token,
            'X-Requested-With': "XMLHttpRequest",
        };
        try {
            const result = yield fetch(url, options).then(res => res.json());
            yield put(actionType.success(result))
        } catch (e) {
            yield put(actionType.error(e))
        }
    });
}