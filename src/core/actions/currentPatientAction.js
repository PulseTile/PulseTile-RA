import { createRequestTypes } from "./functions";

export const CURRENT_PATIENT_ACTION = createRequestTypes('CURRENT_PATIENT_ACTION', { UPDATE: 'UPDATE' });

export const currentPatientAction = {
    update: data => ({ type: CURRENT_PATIENT_ACTION.UPDATE, data }),
};
