import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { PATIENTS_COUNT_ACTION, patientsCountAction } from "../actions/patientsCountAction";
import { domainName, token } from "../token";
import { httpErrorAction } from '../actions/httpErrorAction';

let responseInfo = {};

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
                responseInfo.status = get(res, 'status', null);
                return res.json()
            })
            .then(res => {
                if (responseInfo.status !== 200) {
                    responseInfo.errorMessage = get(res, 'error', null);
                    return false;
                }
                return res;
            });

        if (responseInfo.status === 200) {
            yield put(patientsCountAction.success(result))
        } else {
            yield put(httpErrorAction.save({
                status: responseInfo.status,
                message: responseInfo.errorMessage
            }));
        }

    } catch(e) {
        yield put(patientsCountAction.error(e))
    }
});
