import { createRequestTypes } from "../../../core/actions/functions";

export const BUSINESS_INTELLIGENCE_ACTION = createRequestTypes('BUSINESS_INTELLIGENCE_ACTION', { UPDATE: 'UPDATE', REMOVE: 'REMOVE' });

export const businessIntelligenceAction = {
    request: data => ({ type: BUSINESS_INTELLIGENCE_ACTION.REQUEST, data }),
    success: data => ({ type: BUSINESS_INTELLIGENCE_ACTION.SUCCESS, data }),
    error: data => ({ type: BUSINESS_INTELLIGENCE_ACTION.FAILURE, data }),
    update: data => ({ type: BUSINESS_INTELLIGENCE_ACTION.UPDATE, data }),
    remove: data => ({ type: BUSINESS_INTELLIGENCE_ACTION.REMOVE, data }),
};