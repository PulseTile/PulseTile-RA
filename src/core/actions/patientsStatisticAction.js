import { createRequestTypes } from "./functions";

export const PATIENTS_STATISTIC = createRequestTypes('PATIENTS_STATISTIC');

export const patientStatisticAction = {
    request: data => ({ type: PATIENTS_STATISTIC.REQUEST, data }),
    success: data => ({ type: PATIENTS_STATISTIC.SUCCESS, data }),
    error:   error => ({ type: PATIENTS_STATISTIC.FAILURE, error }),
};
