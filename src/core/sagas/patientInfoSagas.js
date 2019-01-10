import { fork, put } from 'redux-saga/effects';
import { get } from "lodash";
import { token } from "../token";
import { patientInfoAction } from '../actions/patientInfoAction';

function* patientInfoSagas() {

    const params = yield put(patientInfoAction.request());

    console.log('++++++++++++++++++++++++')
    console.log(params)

    const userId = get(params, 'payload', null);

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

    console.log('url ' + url)

    try {
        console.log('++++++++++++++++++++++++ request')
        const result = yield fetch(url, options).then(res => res.json());

        console.log('SAGAS')
        console.log(result)

        yield put(patientInfoAction.success(result))
    } catch(e) {
        yield put(patientInfoAction.failure(e))
    }
}

export default [
    fork(patientInfoSagas),
];
