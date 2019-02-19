import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { token, domainName } from "../token";

export default function createCustomSagas(actionName, actionType, pluginName) {

    console.log('actionName', actionName);
    console.log('actionType', actionType);
    console.log('pluginName', pluginName);

    return takeEvery(actionName.REQUEST, function*(action) {
        const userId = get(action, 'data', null);
        const url = domainName + '/api/patients/' + userId + '/synopsis/' + pluginName;
        let options = {};
        options.method = "GET";
        if (!options.headers) {
            options.headers = new Headers({Accept: 'application/json'});
        }
        options.headers = {
            Authorization: "Bearer " + token,
            'X-Requested-With': "XMLHttpRequest",
        };
        try {
            const result = yield fetch(url, options).then(res => res.json());
            yield put(actionType.success(result))
        } catch (e) {
            yield put(actionType.error(e))
        }
    });
}