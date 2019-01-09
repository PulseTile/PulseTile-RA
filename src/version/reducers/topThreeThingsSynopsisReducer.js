import { get } from "lodash";
import { topThreeThingsSynopsisAction } from "../actions/synopsisActions";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case topThreeThingsSynopsisAction.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case topThreeThingsSynopsisAction.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(payload, "synopsis", []),
            };
        case topThreeThingsSynopsisAction.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}