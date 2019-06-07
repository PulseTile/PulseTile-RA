import { createRequestTypes } from "../../../core/actions/functions";

export const PERSONAL_DETAILS_ACTION = createRequestTypes('PERSONAL_DETAILS_ACTION', { CREATE: 'CREATE', REMOVE: 'REMOVE' });

export const personalDetailsAction = {
    request: data => ({ type: PERSONAL_DETAILS_ACTION.REQUEST, data }),
    create: data => ({ type: PERSONAL_DETAILS_ACTION.CREATE, data }),
    success: data => ({ type: PERSONAL_DETAILS_ACTION.SUCCESS, data }),
    error:   error => ({ type: PERSONAL_DETAILS_ACTION.FAILURE, error }),
    remove: data => ({ type: PERSONAL_DETAILS_ACTION.REMOVE, data }),
};
