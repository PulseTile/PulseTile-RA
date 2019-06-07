import { createRequestTypes } from "../../../core/actions/functions";

export const MODAL_OPEN_ACTION = createRequestTypes('MODAL_OPEN_ACTION');

export const modalOpenAction = {
    request: data => ({ type: MODAL_OPEN_ACTION.REQUEST, data }),
};
