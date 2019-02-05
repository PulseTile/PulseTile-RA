import { createRequestTypes } from "./functions";

export const PATIENT_INFO = createRequestTypes('PATIENT_INFO');

export const patientInfoAction = {
    request: data => ({ type: PATIENT_INFO.REQUEST, data }),
    success: data => ({ type: PATIENT_INFO.SUCCESS, data }),
    error:   error => ({ type: PATIENT_INFO.FAILURE, error }),
};
