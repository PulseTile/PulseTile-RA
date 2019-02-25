import { createRequestTypes } from "../../core/actions/functions";

export const RESPECT_PERSONAL_DETAILS = createRequestTypes('RESPECT_PERSONAL_DETAILS', { CREATE: 'CREATE' });

export const respectPersonalDetailsAction = {
    request: data => ({ type: RESPECT_PERSONAL_DETAILS.REQUEST, data }),
    create: data => ({ type: RESPECT_PERSONAL_DETAILS.CREATE, data }),
    success: data => ({ type: RESPECT_PERSONAL_DETAILS.SUCCESS, data }),
    error:   error => ({ type: RESPECT_PERSONAL_DETAILS.FAILURE, error }),
};
