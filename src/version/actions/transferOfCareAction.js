import { createRequestTypes } from "../../core/actions/functions";

export const TRANSFER_OF_CARE_ACTION = createRequestTypes('TRANSFER_OF_CARE_ACTION', { CREATE: 'CREATE '});

export const transferOfCareAction = {
    create: data => ({ type: TRANSFER_OF_CARE_ACTION.CREATE, data }),
    success: data => ({ type: TRANSFER_OF_CARE_ACTION.SUCCESS, data }),
    error: data => ({ type: TRANSFER_OF_CARE_ACTION.FAILURE, data }),
};
