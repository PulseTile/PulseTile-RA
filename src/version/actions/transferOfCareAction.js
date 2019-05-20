import { createRequestTypes } from "../../core/actions/functions";

export const TRANSFER_OF_CARE_ACTION = createRequestTypes('TRANSFER_OF_CARE_ACTION', {
    CREATE: 'CREATE',
    REQUEST_ONE: 'REQUEST_ONE',
    LIST: 'LIST',
    DETAILS: 'DETAILS',
});

export const transferOfCareAction = {
    request: data => ({ type: TRANSFER_OF_CARE_ACTION.REQUEST, data }),
    requestOne: (heading, sourceId) => ({ type: TRANSFER_OF_CARE_ACTION.REQUEST_ONE, heading, sourceId }),
    list: data => ({ type: TRANSFER_OF_CARE_ACTION.LIST, data }),
    details: data => ({ type: TRANSFER_OF_CARE_ACTION.DETAILS, data }),
    create: data => ({ type: TRANSFER_OF_CARE_ACTION.CREATE, data }),
    success: data => ({ type: TRANSFER_OF_CARE_ACTION.SUCCESS, data }),
    error: data => ({ type: TRANSFER_OF_CARE_ACTION.FAILURE, data }),
};
