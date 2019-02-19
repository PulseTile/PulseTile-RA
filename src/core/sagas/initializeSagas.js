import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { domainName } from "../token";
import { INITIALIZE_ACTION, initializeAction } from "../actions/initializeAction";

export default takeEvery(INITIALIZE_ACTION.REQUEST, function*(action) {
    const url = domainName + '/api/initialise';
    let options = {};
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        'X-Requested-With': "XMLHttpRequest",
    };
    try {
        const result = yield fetch(url, options).then(res => res.json())
            .then(response => {
                const redirectUrl = get(response, 'redirectURL', null);
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                }
                return response;
            });
        yield put(initializeAction.success(result))
    } catch(e) {
        yield put(initializeAction.error(e))
    }
});