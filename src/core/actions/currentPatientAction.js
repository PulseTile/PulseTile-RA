import { createRequestTypes } from "./functions";

export const CURRENT_PATIENT_ACTION = createRequestTypes('CURRENT_PATIENT_ACTION');

export const currentPatientAction = {
    request: data => ({ type: CURRENT_PATIENT_ACTION.REQUEST, data }),
    success: data => ({ type: CURRENT_PATIENT_ACTION.SUCCESS, data }),
    error:   error => ({ type: CURRENT_PATIENT_ACTION.FAILURE, error }),
};