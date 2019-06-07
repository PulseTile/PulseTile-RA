import { createRequestTypes } from "../../../core/actions/functions";

export const VERSIONS_SERVER_ACTION = createRequestTypes('VERSIONS_SERVER_ACTION', {
    CREATE: 'CREATE',
    PUT: 'PUT',
    REQUEST_ONE: 'REQUEST_ONE',
    REQUEST_LATEST: 'REQUEST_LATEST',
    SUCCESS_ONE: 'SUCCESS_ONE',
    SUCCESS_LATEST: 'SUCCESS_LATEST',
    SUCCESS_CREATE: 'SUCCESS_CREATE',
    SUCCESS_PUT: 'SUCCESS_PUT',
});

export const versionsServerAction = {
    request: data => ({ type: VERSIONS_SERVER_ACTION.REQUEST, data }),
    requestOne: (sourceId, versionId) => ({ type: VERSIONS_SERVER_ACTION.REQUEST_ONE, sourceId, versionId }),
    requestLatest: (sourceId, versionId) => ({ type: VERSIONS_SERVER_ACTION.REQUEST_LATEST, sourceId, versionId }),
    create: data => ({ type: VERSIONS_SERVER_ACTION.CREATE, data }),
    put: (sourceId, versionId, versionData) => ({ type: VERSIONS_SERVER_ACTION.PUT, sourceId, versionId, versionData }),
    success: data => ({ type: VERSIONS_SERVER_ACTION.SUCCESS, data }),
    successOne: data => ({ type: VERSIONS_SERVER_ACTION.SUCCESS_ONE, data }),
    successLatest: data => ({ type: VERSIONS_SERVER_ACTION.SUCCESS_LATEST, data }),
    successCreate: data => ({ type: VERSIONS_SERVER_ACTION.SUCCESS_CREATE, data }),
    successPut: data => ({ type: VERSIONS_SERVER_ACTION.SUCCESS_PUT, data }),
    error:   error => ({ type: VERSIONS_SERVER_ACTION.FAILURE, error }),
};
