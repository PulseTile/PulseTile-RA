import { fork, put } from 'redux-saga/effects';
import { get } from "lodash";
import { token } from "../token";
import {
    allergiesSynopsisAction,
    problemsSynopsisAction,
    medicationsSynopsisAction,
    contactsSynopsisAction
} from '../actions/synopsisActions';
import { nonCoreSynopsisSagas } from "../../version/config/nonCoreSynopsis";

function* synopsisSagas() {

    const coreSynopsis = [
        { heading: 'allergies', action: allergiesSynopsisAction },
        { heading: 'contacts', action: contactsSynopsisAction },
        { heading: 'medications', action: medicationsSynopsisAction },
        { heading: 'problems', action: problemsSynopsisAction }
    ];

    const synopsisArray = coreSynopsis.concat(nonCoreSynopsisSagas);

    for (let i = 0, n = synopsisArray.length; i < n; i++) {
        let item = synopsisArray[i];
        const params = yield put(item.action.request());
        const userId = get(params, 'payload', null);

        const domainName = "http://dev.ripple.foundation:8000";
        const apiPatientsUser = 'api/patients';
        const route = "synopsis/" + item.heading;

        const url = domainName + '/' + apiPatientsUser + '/' + userId + '/' + route;
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
            yield put(item.action.success(res))
        } catch(e) {
            yield put(item.action.failure(e))
        }
    }

}

export default [
    fork(synopsisSagas),
];
