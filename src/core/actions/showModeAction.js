import { createRequestTypes } from "./functions";

export const SHOW_MODE_ACTION = createRequestTypes('SHOW_MODE_ACTION');

export const showModeAction = {
    request: data => ({ type: SHOW_MODE_ACTION.REQUEST, data }),
    success: data => ({ type: SHOW_MODE_ACTION.SUCCESS, data }),
    error:   error => ({ type: SHOW_MODE_ACTION.FAILURE, error }),
};
