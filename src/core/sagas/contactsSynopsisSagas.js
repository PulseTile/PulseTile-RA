import { fork, put } from 'redux-saga/effects';
import { get } from "lodash";
import { token } from "../token";
import { contactsSynopsisAction } from '../actions/synopsisActions';

function* synopsisSagas() {

    const params = yield put(contactsSynopsisAction.request());
    const userId = get(params, 'payload', null);

    const domainName = "http://dev.ripple.foundation:8000";
    const apiPatientsUser = 'api/patients';
    const route = "synopsis/contacts";

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
        yield put(contactsSynopsisAction.success(res))
    } catch(e) {
        yield put(contactsSynopsisAction.failure(e))
    }
}

export default [
    fork(synopsisSagas),
];
