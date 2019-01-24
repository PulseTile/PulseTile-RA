import { createRequestTypes } from "./functions";

export const SHOW_HEADINGS_ACTION = createRequestTypes('SHOW_HEADINGS_ACTION');

export const showHeadingsAction = {
    request: data => ({ type: SHOW_HEADINGS_ACTION.REQUEST, data }),
    success: data => ({ type: SHOW_HEADINGS_ACTION.SUCCESS, data }),
    error:   error => ({ type: SHOW_HEADINGS_ACTION.FAILURE, error }),
};
