import { createRequestTypes } from "../../core/actions/functions";

export const SYNOPSIS_TOP_THREE_THINGS_ACTION = createRequestTypes('SYNOPSIS_TOP_THREE_THINGS_ACTION');
export const SYNOPSIS_VACCINATIONS_ACTION = createRequestTypes('SYNOPSIS_VACCINATIONS_ACTION');

export const synopsisTopThreeThingsAction = {
    request: data => ({ type: SYNOPSIS_TOP_THREE_THINGS_ACTION.REQUEST, data }),
    success: data => ({ type: SYNOPSIS_TOP_THREE_THINGS_ACTION.SUCCESS, data }),
    error:   error => ({ type: SYNOPSIS_TOP_THREE_THINGS_ACTION.FAILURE, error }),
};

export const synopsisVaccinationsAction = {
    request: data => ({ type: SYNOPSIS_VACCINATIONS_ACTION.REQUEST, data }),
    success: data => ({ type: SYNOPSIS_VACCINATIONS_ACTION.SUCCESS, data }),
    error:   error => ({ type: SYNOPSIS_VACCINATIONS_ACTION.FAILURE, error }),
};
