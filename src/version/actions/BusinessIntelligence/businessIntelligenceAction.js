import { createRequestTypes } from "../../../core/actions/functions";

export const BUSINESS_INTELLIGENCE_ACTION = createRequestTypes('BUSINESS_INTELLIGENCE_ACTION', { UPDATE: 'UPDATE' });

export const businessIntelligenceAction = {
    update: data => ({type: BUSINESS_INTELLIGENCE_ACTION.UPDATE, data}),
};