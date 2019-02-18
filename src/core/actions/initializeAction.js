import { createRequestTypes } from "./functions";

export const INITIALIZE_ACTION = createRequestTypes('INITIALIZE_ACTION');

export const initializeAction = {
    request: data => ({ type: INITIALIZE_ACTION.REQUEST, data }),
    success: data => ({ type: INITIALIZE_ACTION.SUCCESS, data }),
    error:   error => ({ type: INITIALIZE_ACTION.FAILURE, error }),
};
