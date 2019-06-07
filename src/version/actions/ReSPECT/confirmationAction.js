import { createRequestTypes } from "../../../core/actions/functions";

export const CONFIRMATION_ACTION = createRequestTypes('CONFIRMATION_ACTION', { CREATE: 'CREATE', REMOVE: 'REMOVE' });

export const confirmationAction = {
    request: data => ({ type: CONFIRMATION_ACTION.REQUEST, data }),
    create: data => ({ type: CONFIRMATION_ACTION.CREATE, data }),
    success: data => ({ type: CONFIRMATION_ACTION.SUCCESS, data }),
    error:   error => ({ type: CONFIRMATION_ACTION.FAILURE, error }),
    remove: data => ({ type: CONFIRMATION_ACTION.REMOVE, data }),
};
