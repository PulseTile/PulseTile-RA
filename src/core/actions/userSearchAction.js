import { createRequestTypes } from "../../core/actions/functions";

export const USER_SEARCH_ACTION = createRequestTypes('USER_SEARCH_ACTION', { REMOVE: 'REMOVE', REQUEST_ID: 'REQUEST_ID' });

export const userSearchAction = {
    request: data => ({ type: USER_SEARCH_ACTION.REQUEST, data }),
    requestId: data => ({ type: USER_SEARCH_ACTION.REQUEST_ID, data }),
    remove: data => ({ type: USER_SEARCH_ACTION.REMOVE, data }),
};