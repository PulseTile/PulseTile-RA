import get from "lodash/get";
import { takeEvery, put } from 'redux-saga/effects';

import { token, domainName } from "../token";
import { httpErrorAction } from '../actions/httpErrorAction';

let responseInfo = {};

export default function createCustomSagas(actionName, actionType, pluginName) {
    return takeEvery(actionName.REQUEST, function*(action) {
        let url = domainName + '/api/patients/' + localStorage.getItem('patientId') + '/synopsis/' + pluginName;
        // if (pluginName === 'top3Things') {
        //     url = domainName + '/api/patients/' + localStorage.getItem('patientId') + '/synopsis/' + pluginName + '/latest';
        // }
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
                yield put(actionType.success(result))
            } else {
                yield put(httpErrorAction.save({
                    status: responseInfo.status,
                    message: responseInfo.errorMessage
                }));
            }

        } catch(e) {
            yield put(actionType.error(e))
        }
    });
}