import { createRequestTypes } from "../../../core/actions/functions";

export const SUMMARY_INFORMATION_ACTION = createRequestTypes('SUMMARY_INFORMATION_ACTION', { CREATE: 'CREATE', REMOVE: 'REMOVE' });

export const summaryInformationAction = {
    request: data => ({ type: SUMMARY_INFORMATION_ACTION.REQUEST, data }),
    create: data => ({ type: SUMMARY_INFORMATION_ACTION.CREATE, data }),
    success: data => ({ type: SUMMARY_INFORMATION_ACTION.SUCCESS, data }),
    error:   error => ({ type: SUMMARY_INFORMATION_ACTION.FAILURE, error }),
    remove: data => ({ type: SUMMARY_INFORMATION_ACTION.REMOVE, data }),
};
