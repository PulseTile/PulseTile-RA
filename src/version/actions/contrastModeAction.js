import { createRequestTypes } from "../../core/actions/functions";

export const CONTRAST_MODE_ACTION = createRequestTypes('CONTRAST_MODE_ACTION');

export const contrastModeAction = {
    request: data => ({ type: CONTRAST_MODE_ACTION.REQUEST, data }),
};
