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
            return {
                ...state,
                loading: true,
                data: action.data,
            };
        case VERSIONS_SERVER_ACTION.REQUEST_ONE:
            return {
                ...state,
                loading: true,
                data: action.data,
            };
        case VERSIONS_SERVER_ACTION.CREATE:
            return {
                ...state,
                loading: true,
                data: null,
            };
        case VERSIONS_SERVER_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
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