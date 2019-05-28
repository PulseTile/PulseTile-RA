import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { domainName, token } from "../token";
import { CURRENT_PATIENT_ACTION, currentPatientAction } from "../actions/currentPatientAction";

export default takeEvery(CURRENT_PATIENT_ACTION.REQUEST, function*(action) {
    const search = get(action, 'data', null);
    let url = `${domainName}/mpi/Patient/${localStorage.getItem('patientId')}`;
    if (search) {
        url = `${domainName}/mpi/Patient/${search}`;
    }
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
        yield put(currentPatientAction.success(result));
    } catch(e) {
        yield put(currentPatientAction.error(e));
    }
});