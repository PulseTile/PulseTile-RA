import { takeEvery, put } from 'redux-saga/effects';
import { get } from "lodash";

import { token } from "../token";
import { PATIENT_INFO, patientInfoAction } from "../actions/patientInfoAction";

export default takeEvery(PATIENT_INFO.REQUEST, function*(action) {
    const userId = get(action, 'data', null);
    const domainName = "http://dev.ripple.foundation";
    const apiPatientsUser = 'api/patients';
    const url = domainName + '/' + apiPatientsUser + '/' + userId;
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(patientInfoAction.success(result))
    } catch(e) {
        yield put(patientInfoAction.error(e))
    }
});
