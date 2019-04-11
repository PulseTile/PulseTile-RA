import { takeEvery, put } from 'redux-saga/effects';

import { token, domainName } from "../../core/token";
import { TRANSFER_OF_CARE_ACTION, transferOfCareAction } from "../actions/transferOfCareAction";

const patientID = localStorage.getItem('patientId') ? localStorage.getItem('patientId') : localStorage.getItem('userId');

export default takeEvery(TRANSFER_OF_CARE_ACTION.CREATE, function*(action) {
    const url = domainName + '/api/patients/' + patientID + '/events/toc';
    let options = {};
    options.method = 'POST';
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(transferOfCareAction.success(result))
    } catch(e) {
        yield put(transferOfCareAction.error(e))
    }
});
