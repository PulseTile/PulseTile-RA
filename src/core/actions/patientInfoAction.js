import { createRoutine } from 'redux-saga-routines';

// For common request about patient (for dev.ripple.foundation without 8000)
export const patientInfoAction = createRoutine('PATIENT_INFO_ACTION');
