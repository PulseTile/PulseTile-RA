import { createRequestTypes } from "../../../core/actions/functions";

export const PERSONAL_PREFERENCES_ACTION = createRequestTypes('PERSONAL_PREFERENCES_ACTION', { CREATE: 'CREATE', REMOVE: 'REMOVE' });

export const personalPreferencesAction = {
    request: data => ({ type: PERSONAL_PREFERENCES_ACTION.REQUEST, data }),
    create: data => ({ type: PERSONAL_PREFERENCES_ACTION.CREATE, data }),
    success: data => ({ type: PERSONAL_PREFERENCES_ACTION.SUCCESS, data }),
    error:   error => ({ type: PERSONAL_PREFERENCES_ACTION.FAILURE, error }),
    remove: data => ({ type: PERSONAL_PREFERENCES_ACTION.REMOVE, data }),
};
