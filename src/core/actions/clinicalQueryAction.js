import { createRequestTypes } from "./functions";

export const CLINICAL_QUERY_ACTION = createRequestTypes('CLINICAL_QUERY_ACTION', { CREATE: 'CREATE', REMOVE: 'REMOVE' });

export const clinicalQueryAction = {
    create: data => ({ type: CLINICAL_QUERY_ACTION.CREATE, data }),
    remove: data => ({ type: CLINICAL_QUERY_ACTION.REMOVE, data }),
};