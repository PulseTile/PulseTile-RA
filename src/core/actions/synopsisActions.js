import { createRequestTypes } from "./functions";

export const SYNOPSIS_ALLERGIES_ACTION = createRequestTypes('SYNOPSIS_ALLERGIES_ACTION');
export const SYNOPSIS_CONTACTS_ACTION = createRequestTypes('SYNOPSIS_CONTACTS_ACTION');
export const SYNOPSIS_MEDICATIONS_ACTION = createRequestTypes('SYNOPSIS_MEDICATIONS_ACTION');
export const SYNOPSIS_PROBLEMS_ACTION = createRequestTypes('SYNOPSIS_PROBLEMS_ACTION');

export const synopsisAllergiesAction = {
    request: data => ({ type: SYNOPSIS_ALLERGIES_ACTION.REQUEST, data }),
    success: data => ({ type: SYNOPSIS_ALLERGIES_ACTION.SUCCESS, data }),
    error:   error => ({ type: SYNOPSIS_ALLERGIES_ACTION.FAILURE, error }),
};

export const synopsisContactsAction = {
    request: data => ({ type: SYNOPSIS_CONTACTS_ACTION.REQUEST, data }),
    success: data => ({ type: SYNOPSIS_CONTACTS_ACTION.SUCCESS, data }),
    error:   error => ({ type: SYNOPSIS_CONTACTS_ACTION.FAILURE, error }),
};

export const synopsisMedicationsAction = {
    request: data => ({ type: SYNOPSIS_MEDICATIONS_ACTION.REQUEST, data }),
    success: data => ({ type: SYNOPSIS_MEDICATIONS_ACTION.SUCCESS, data }),
    error:   error => ({ type: SYNOPSIS_MEDICATIONS_ACTION.FAILURE, error }),
};

export const synopsisProblemsAction = {
    request: data => ({ type: SYNOPSIS_PROBLEMS_ACTION.REQUEST, data }),
    success: data => ({ type: SYNOPSIS_PROBLEMS_ACTION.SUCCESS, data }),
    error:   error => ({ type: SYNOPSIS_PROBLEMS_ACTION.FAILURE, error }),
};

