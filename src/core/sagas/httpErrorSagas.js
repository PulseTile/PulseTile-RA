import get from "lodash/get";
import { CRUD_GET_LIST_FAILURE } from "react-admin";
import { put, takeEvery } from "redux-saga/effects";

import { httpErrorAction } from '../actions/httpErrorAction';

export default takeEvery(CRUD_GET_LIST_FAILURE, function* (action) {
    const error = get(action, 'error', null);
    const errorTrim = error.replace('Error:', '').trim();
    const errorArray = errorTrim.split('|');
    const data = {
        status: get(errorArray, [0], null),
        message: get(errorArray, [1], null)
    };
    yield put(httpErrorAction.save(data));
});