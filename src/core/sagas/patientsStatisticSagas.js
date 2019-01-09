import { fork, put } from 'redux-saga/effects';
import { get } from "lodash";
import { token } from "../token";
import { patientsStatisticAction } from '../actions/patientsAction';

function* synopsisSagas() {

    const params = yield put(patientsStatisticAction.request());
    const userId = get(params, 'payload', null);

    const domainName = "http://dev.ripple.foundation:8000";
    const apiPatientsUser = 'api/patients';

    const url = domainName + '/' + apiPatientsUser;
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
        yield put(patientsStatisticAction.success(res))
    } catch(e) {
        yield put(patientsStatisticAction.failure(e))
    }
}

export default [
    fork(synopsisSagas),
];
