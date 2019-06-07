import { createRequestTypes } from "../../../core/actions/functions";

export const EMERGENCY_CONTACTS_ACTION = createRequestTypes('EMERGENCY_CONTACTS_ACTION', { CREATE: 'CREATE', REMOVE: 'REMOVE' });

export const emergencyContactsAction = {
    request: data => ({ type: EMERGENCY_CONTACTS_ACTION.REQUEST, data }),
    create: data => ({ type: EMERGENCY_CONTACTS_ACTION.CREATE, data }),
    success: data => ({ type: EMERGENCY_CONTACTS_ACTION.SUCCESS, data }),
    error:   error => ({ type: EMERGENCY_CONTACTS_ACTION.FAILURE, error }),
    remove: data => ({ type: EMERGENCY_CONTACTS_ACTION.REMOVE, data }),
};
