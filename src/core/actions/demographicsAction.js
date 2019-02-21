import { createRequestTypes } from "./functions";

export const DEMOGRAPHICS_ACTION = createRequestTypes('DEMOGRAPHICS_ACTION');

export const demographicsAction = {
    request: data => ({ type: DEMOGRAPHICS_ACTION.REQUEST, data }),
    success: data => ({ type: DEMOGRAPHICS_ACTION.SUCCESS, data }),
    error:   error => ({ type: DEMOGRAPHICS_ACTION.FAILURE, error }),
};
