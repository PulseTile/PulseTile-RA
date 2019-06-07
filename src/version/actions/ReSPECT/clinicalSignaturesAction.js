import { createRequestTypes } from "../../../core/actions/functions";

export const CLINICAL_SIGNATURES_ACTION = createRequestTypes('CLINICAL_SIGNATURES_ACTION', { CREATE: 'CREATE', REMOVE: 'REMOVE' });

export const clinicalSignaturesAction = {
    request: data => ({ type: CLINICAL_SIGNATURES_ACTION.REQUEST, data }),
    create: data => ({ type: CLINICAL_SIGNATURES_ACTION.CREATE, data }),
    success: data => ({ type: CLINICAL_SIGNATURES_ACTION.SUCCESS, data }),
    error:   error => ({ type: CLINICAL_SIGNATURES_ACTION.FAILURE, error }),
    remove: data => ({ type: CLINICAL_SIGNATURES_ACTION.REMOVE, data }),
};
