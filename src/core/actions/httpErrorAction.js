import { createRequestTypes } from "./functions";

export const HTTP_ERROR_ACTION = createRequestTypes('HTTP_ERROR_ACTION', { SAVE: 'SAVE', REMOVE: 'REMOVE' });

export const httpErrorAction = {
    save: data => ({ type: HTTP_ERROR_ACTION.SAVE, data }),
    remove: data => ({ type: HTTP_ERROR_ACTION.REMOVE, data }),
};
