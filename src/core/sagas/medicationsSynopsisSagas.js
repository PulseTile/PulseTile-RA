import { fork, put } from 'redux-saga/effects';
import { get } from "lodash";
import { token } from "../token";
import { medicationsSynopsisAction } from '../actions/synopsisActions';

function* synopsisSagas() {

    const params = yield put(medicationsSynopsisAction.request());
    const userId = get(params, 'payload', null);

    const domainName = "http://dev.ripple.foundation:8000";
    const apiPatientsUser = 'api/patients';
    const route = "synopsis/medications";

    const url = domainName + '/' + apiPatientsUser + '/' + userId + '/' + route;
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
    };

    try {
        const res = yield fetch(url, options).then(res => res.json());
        yield put(medicationsSynopsisAction.success(res))
    } catch(e) {
        yield put(medicationsSynopsisAction.failure(e))
    }
}

export default [
    fork(synopsisSagas),
];
