import { createRequestTypes } from "../../../core/actions/functions";

export const CAPACITY_AND_REPRESENTATION_ACTION = createRequestTypes('CAPACITY_AND_REPRESENTATION_ACTION', { CREATE: 'CREATE', REMOVE: 'REMOVE' });

export const capacityAndRepresentationAction = {
    request: data => ({ type: CAPACITY_AND_REPRESENTATION_ACTION.REQUEST, data }),
    create: data => ({ type: CAPACITY_AND_REPRESENTATION_ACTION.CREATE, data }),
    success: data => ({ type: CAPACITY_AND_REPRESENTATION_ACTION.SUCCESS, data }),
    error:   error => ({ type: CAPACITY_AND_REPRESENTATION_ACTION.FAILURE, error }),
    remove: data => ({ type: CAPACITY_AND_REPRESENTATION_ACTION.REMOVE, data }),
};
