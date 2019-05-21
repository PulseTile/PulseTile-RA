import { createRequestTypes } from "../../core/actions/functions";

export const VITALS_ACTION = createRequestTypes('VITALS_ACTION', {
    CREATE: 'CREATE',
});

export const vitalsAction = {
    create: data => ({ type: VITALS_ACTION.CREATE, data }),
    success: data => ({ type: VITALS_ACTION.SUCCESS, data }),
    error: data => ({ type: VITALS_ACTION.FAILURE, data }),
};
