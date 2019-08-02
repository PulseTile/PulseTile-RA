import { createRequestTypes } from "./functions";

export const EMERGENCY_SUMMARY_ACTION = createRequestTypes('EMERGENCY_SUMMARY_ACTION');

export const emergencySummaryAction = {
    request: (resource, patientId) => ({ type: EMERGENCY_SUMMARY_ACTION.REQUEST, resource, patientId }),
    success: data => ({ type: EMERGENCY_SUMMARY_ACTION.SUCCESS, data }),
    error:   error => ({ type: EMERGENCY_SUMMARY_ACTION.FAILURE, error }),
};
