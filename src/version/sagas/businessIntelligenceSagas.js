import get from "lodash/get";
import { takeEvery, put } from 'redux-saga/es/effects';

import { token, domainName } from "../../core/token";
import { BUSINESS_INTELLIGENCE_ACTION, businessIntelligenceAction } from "../actions/BusinessIntelligence/businessIntelligenceAction";

export default takeEvery(BUSINESS_INTELLIGENCE_ACTION.REQUEST, function*(action) {
    // const url = domainName + '/BI-data';
    // let options = {};
    // options.method = 'GET';
    // if (!options.headers) {
    //     options.headers = new Headers({ Accept: 'application/json' });
    // }
    // options.headers = {
    //     Authorization: "Bearer " + token,
    //     'X-Requested-With': "XMLHttpRequest",
    // };
    // try {
    //     const result = yield fetch(url, options).then(res => res.json());
    //     const patients = get(result, 'patients', []);
    //     yield put(businessIntelligenceAction.success(patients));
    // } catch(e) {
    //     yield put(businessIntelligenceAction.error(e));
    // }

    yield put(businessIntelligenceAction.success());
});