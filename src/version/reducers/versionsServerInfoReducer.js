import get from 'lodash/get';

import { VERSIONS_SERVER_ACTION } from "../actions/ReSPECT/versionsServerAction";

const initialState = {
    data: false,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case VERSIONS_SERVER_ACTION.REQUEST:
        case VERSIONS_SERVER_ACTION.REQUEST_ONE:
        case VERSIONS_SERVER_ACTION.REQUEST_LATEST:
            return {
                ...state,
                loading: true,
                data: action.data,
            };
        case VERSIONS_SERVER_ACTION.CREATE:
            return {
                ...state,
                loading: true,
            };
        case VERSIONS_SERVER_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
            };
        case VERSIONS_SERVER_ACTION.SUCCESS_ONE:
            return {
                ...state,
                loading: false,
                version: get(action, "data.respect_form", null),
            };
        case VERSIONS_SERVER_ACTION.SUCCESS_LATEST:
            return {
                ...state,
                loading: false,
                latest: get(action, "data.respect_form", null),
            };
        case VERSIONS_SERVER_ACTION.SUCCESS_CREATE:
            return {
                ...state,
                loading: false,
                newVersion: get(action, "data", null),
            };
        case VERSIONS_SERVER_ACTION.ERROR:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}