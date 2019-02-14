import { createRequestTypes } from "../../core/actions/functions";

export const SYNOPSIS_VACCINATIONS_ACTION = createRequestTypes('SYNOPSIS_VACCINATIONS_ACTION');

export const synopsisVaccinationsAction = {
    request: data => ({ type: SYNOPSIS_VACCINATIONS_ACTION.REQUEST, data }),
    success: data => ({ type: SYNOPSIS_VACCINATIONS_ACTION.SUCCESS, data }),
    error:   error => ({ type: SYNOPSIS_VACCINATIONS_ACTION.FAILURE, error }),
};
