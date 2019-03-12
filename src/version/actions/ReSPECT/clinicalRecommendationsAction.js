import { createRequestTypes } from "../../../core/actions/functions";

export const CLINICAL_RECOMMENDATIONS_ACTION = createRequestTypes('CLINICAL_RECOMMENDATIONS_ACTION', { CREATE: 'CREATE', REMOVE: 'REMOVE' });

export const clinicalRecommendationsAction = {
    request: data => ({ type: CLINICAL_RECOMMENDATIONS_ACTION.REQUEST, data }),
    create: data => ({ type: CLINICAL_RECOMMENDATIONS_ACTION.CREATE, data }),
    success: data => ({ type: CLINICAL_RECOMMENDATIONS_ACTION.SUCCESS, data }),
    error:   error => ({ type: CLINICAL_RECOMMENDATIONS_ACTION.FAILURE, error }),
    remove: data => ({ type: CLINICAL_RECOMMENDATIONS_ACTION.REMOVE, data }),
};
