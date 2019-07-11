import get from "lodash/get";

import { BUSINESS_INTELLIGENCE_ACTION } from "../actions/BusinessIntelligence/businessIntelligenceAction";
import dummyData from "./dummyBIdata";

const initialState = {
    data: false,
    patients: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case BUSINESS_INTELLIGENCE_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
                patients: null,
            };
        case BUSINESS_INTELLIGENCE_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                patients: dummyData.patients,
            };
        case BUSINESS_INTELLIGENCE_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, 'error', null),
            };
        case BUSINESS_INTELLIGENCE_ACTION.UPDATE:
            return {
                ...state,
                loading: false,
                data: get(action, 'data', null),
            };
        case BUSINESS_INTELLIGENCE_ACTION.REMOVE:
            return {
                ...state,
                loading: false,
                data: null,
            };
        default:
            return state;
    }
}