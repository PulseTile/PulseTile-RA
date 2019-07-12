import { createRequestTypes } from "./functions";

export const PATIENTS_COUNT_ACTION = createRequestTypes('PATIENTS_COUNT_ACTION');

export const patientsCountAction = {
    request: data => ({ type: PATIENTS_COUNT_ACTION.REQUEST, data }),
    success: data => ({ type: PATIENTS_COUNT_ACTION.SUCCESS, data }),
    error:   error => ({ type: PATIENTS_COUNT_ACTION.FAILURE, error }),
};
