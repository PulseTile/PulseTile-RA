import get from "lodash/get";
import { takeEvery, put } from 'redux-saga/effects';

import { domainName, token } from "../token";
import { DEMOGRAPHICS_ACTION, demographicsAction } from "../actions/demographicsAction";
import { httpErrorAction } from '../actions/httpErrorAction';

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
                return res.json()
            })
            .then(res => {
                return res;
            });

        yield put(demographicsAction.success(result))

    } catch(e) {
        yield put(demographicsAction.error(e))
    }
});