import { createRoutine } from 'redux-saga-routines';

// For separate synopsis request to dev.ripple.foundation:8000
export const allergiesSynopsisAction = createRoutine('ALLERGIES_SINOPSYS');
export const contactsSynopsisAction = createRoutine('CONTACTS_SINOPSYS');
export const medicationsSynopsisAction = createRoutine('MEDICATIONS_SINOPSYS');
export const problemsSynopsisAction = createRoutine('PROBLEMS_SINOPSYS');
