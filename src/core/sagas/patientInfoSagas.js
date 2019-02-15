import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { token, domainName } from "../token";
import { PATIENT_INFO, patientInfoAction } from "../actions/patientInfoAction";

export default takeEvery(PATIENT_INFO.REQUEST, function*(action) {
    const userId = get(action, 'data', null);
    const apiPatientsUser = 'api/patients';
    const url = domainName + '/' + apiPatientsUser + '/' + userId;
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
        yield put(patientInfoAction.success(result))
    } catch(e) {
        yield put(patientInfoAction.error(e))
    }
});
