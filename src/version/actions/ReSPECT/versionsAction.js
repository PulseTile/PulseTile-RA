import { createRequestTypes } from "../../../core/actions/functions";

export const VERSIONS_ACTION = createRequestTypes('VERSIONS_ACTION', { CREATE: 'CREATE' });

export const versionsAction = {
    request: data => ({ type: VERSIONS_ACTION.REQUEST, data }),
    create: data => ({ type: VERSIONS_ACTION.CREATE, data }),
    success: data => ({ type: VERSIONS_ACTION.SUCCESS, data }),
    error:   error => ({ type: VERSIONS_ACTION.FAILURE, error }),
};
