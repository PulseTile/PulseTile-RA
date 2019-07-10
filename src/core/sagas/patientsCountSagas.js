import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { PATIENTS_COUNT_ACTION, patientsCountAction } from "../actions/patientsCountAction";
import { domainName, token } from "../token";
import { httpErrorAction } from '../actions/httpErrorAction';

export default takeEvery(PATIENTS_COUNT_ACTION.REQUEST, function*(action) {

    const patientId = get(action, 'data', null);
    const url = domainName + '/api/patients/' + patientId + '/counts';
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
        'X-Requested-With': "XMLHttpRequest",
    };

    try {
        const result = yield fetch(url, options)
            .then(res => {
               return res.json()
            })
            .then(res => {
                return res;
            });

        yield put(patientsCountAction.success(result))

    } catch(e) {
        yield put(patientsCountAction.error(e))
    }
});
