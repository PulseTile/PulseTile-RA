import { createRequestTypes } from "../../../core/actions/functions";

export const EMERGENCY_VIEW_ACTION = createRequestTypes('EMERGENCY_VIEW_ACTION', { CREATE: 'CREATE' });

export const emergencyViewAction = {
    request: data => ({ type: EMERGENCY_VIEW_ACTION.REQUEST, data }),
    create: data => ({ type: EMERGENCY_VIEW_ACTION.CREATE, data }),
    success: data => ({ type: EMERGENCY_VIEW_ACTION.SUCCESS, data }),
    error:   error => ({ type: EMERGENCY_VIEW_ACTION.FAILURE, error }),
};
