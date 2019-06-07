import get from 'lodash/get';
import moment from "moment";

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
                first: get(action, "data", null),
                latest: null,
            };
        case VERSIONS_SERVER_ACTION.SUCCESS_PUT:

            const newVersion = get(action, "data", null);
            const versionsArray = get(state, "data", []);

            const compositionIdString = get(newVersion, 'compositionUid', null);
            const compositionIdArray = compositionIdString.split('::');

            const sourceId = get(compositionIdArray, [0], null);
            const versionId = get(compositionIdArray, [2], null);

            let date = moment().format("MM/DD/YYYY HH:mm");

            const newItem = {
                source: newVersion.host,
                sourceId: newVersion.host + '-' + sourceId,
                version: Number(versionId),
                author: localStorage.getItem('username'),
                dateCreated: Math.round(new Date(date).getTime()),
                status: "Completed",
            };

            const newArray = [...versionsArray, newItem].sort((prev, next) => next.version - prev.version);

            return {
                ...state,
                loading: false,
                data: newArray,
                latest: null,
                first: null,
                version: null,
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