import { createRequestTypes } from "./functions";

export const ADVANCED_SEARCH_ACTION = createRequestTypes('ADVANCED_SEARCH_ACTION', { CREATE: 'CREATE', REMOVE: 'REMOVE' });

export const advancedSearchAction = {
    create: data => ({ type: ADVANCED_SEARCH_ACTION.CREATE, data }),
    remove: data => ({ type: ADVANCED_SEARCH_ACTION.REMOVE, data }),
};