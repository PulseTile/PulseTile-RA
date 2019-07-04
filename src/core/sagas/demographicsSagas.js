import get from "lodash/get";
import { takeEvery, put } from 'redux-saga/effects';

import { domainName, token } from "../token";
import { DEMOGRAPHICS_ACTION, demographicsAction } from "../actions/demographicsAction";
import { httpErrorAction } from '../actions/httpErrorAction';

let responseInfo = {};

export default takeEvery(DEMOGRAPHICS_ACTION.REQUEST, function*(action) {
    const url = domainName + '/api/demographics/' + localStorage.getItem('patientId');
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
            yield put(demographicsAction.success(result))
        } else {
            yield put(httpErrorAction.save({
                status: responseInfo.status,
                message: responseInfo.errorMessage
            }));
        }

    } catch(e) {
        yield put(demographicsAction.error(e))
    }
});