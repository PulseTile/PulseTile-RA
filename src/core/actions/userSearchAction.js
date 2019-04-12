import { createRequestTypes } from "../../core/actions/functions";

export const USER_SEARCH_ACTION = createRequestTypes('USER_SEARCH_ACTION', { REMOVE: 'REMOVE' });

export const userSearchAction = {
    request: data => ({ type: USER_SEARCH_ACTION.REQUEST, data }),
    remove: data => ({ type: USER_SEARCH_ACTION.REMOVE, data }),
};