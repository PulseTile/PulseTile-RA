import { createRequestTypes } from "../../../core/actions/functions";

export const INVOLVEMENT_ACTION = createRequestTypes('INVOLVEMENT_ACTION', { CREATE: 'CREATE' });

export const involvementAction = {
    request: data => ({ type: INVOLVEMENT_ACTION.REQUEST, data }),
    create: data => ({ type: INVOLVEMENT_ACTION.CREATE, data }),
    success: data => ({ type: INVOLVEMENT_ACTION.SUCCESS, data }),
    error:   error => ({ type: INVOLVEMENT_ACTION.FAILURE, error }),
};
