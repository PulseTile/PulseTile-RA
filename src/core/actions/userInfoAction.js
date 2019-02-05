import { createRequestTypes } from "./functions";

export const USER_INFO_ACTION = createRequestTypes('USER_INFO_ACTION');

export const userInfoAction = {
    request: data => ({ type: USER_INFO_ACTION.REQUEST, data }),
    success: data => ({ type: USER_INFO_ACTION.SUCCESS, data }),
    error:   error => ({ type: USER_INFO_ACTION.FAILURE, error }),
};
