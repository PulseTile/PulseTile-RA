import get from "lodash/get";

import { BUSINESS_INTELLIGENCE_ACTION } from "../actions/BusinessIntelligence/businessIntelligenceAction";

const initialState = {
    data: false,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case BUSINESS_INTELLIGENCE_ACTION.UPDATE:
            return {
                ...state,
                loading: false,
                data: get(action, 'data', null),
            };
        default:
            return state;
    }
}