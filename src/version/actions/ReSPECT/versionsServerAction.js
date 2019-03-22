import { createRequestTypes } from "../../../core/actions/functions";

export const VERSIONS_SERVER_ACTION = createRequestTypes('VERSIONS_SERVER_ACTION', { CREATE: 'CREATE', REQUEST_ONE: 'REQUEST_ONE' });

export const versionsServerAction = {
    request: data => ({ type: VERSIONS_SERVER_ACTION.REQUEST, data }),
    requestOne: data => ({ type: VERSIONS_SERVER_ACTION.REQUEST_ONE, data }),
    create: data => ({ type: VERSIONS_SERVER_ACTION.CREATE, data }),
    success: data => ({ type: VERSIONS_SERVER_ACTION.SUCCESS, data }),
    error:   error => ({ type: VERSIONS_SERVER_ACTION.FAILURE, error }),
};
