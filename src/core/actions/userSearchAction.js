import { createRequestTypes } from "../../core/actions/functions";

export const USER_SEARCH_ACTION = createRequestTypes('USER_SEARCH_ACTION', { REMOVE: 'REMOVE', REQUEST_ID: 'REQUEST_ID', SEARCH_BY: 'SEARCH_BY' });

export const userSearchAction = {
    request: data => ({ type: USER_SEARCH_ACTION.REQUEST, data }),
    requestId: data => ({ type: USER_SEARCH_ACTION.REQUEST_ID, data }),
    searchBy: (searchType, value) => ({ type: USER_SEARCH_ACTION.SEARCH_BY, searchType, value }),
    remove: data => ({ type: USER_SEARCH_ACTION.REMOVE, data }),
};