import get from "lodash/get";
import { takeEvery, put } from 'redux-saga/es/effects';

import { token, domainName } from "../token";
import { EMERGENCY_SUMMARY_ACTION, emergencySummaryAction } from "../actions/emergencySummaryAction";

export default takeEvery(EMERGENCY_SUMMARY_ACTION.REQUEST, function*(action) {
    const resource = get(action, 'resource', null);
    const patientId = get(action, 'patientId', null);
    const url = domainName + '/api/patients/' + patientId + '/' + resource;
    let options = {};
    options.method = 'GET';
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
        'X-Requested-With': "XMLHttpRequest",
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());

        yield put(emergencySummaryAction.success({
            data: result,
            resource: resource,
        }));
    } catch(e) {
        yield put(emergencySummaryAction.error(e));
    }
});