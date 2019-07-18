import get from "lodash/get";
import { VITALS_ACTION } from "../actions/vitalsAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
    current: [],
};

export default (state = initialState, action) => {

    switch (action.type) {
        case VITALS_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VITALS_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, 'data', []),
            };
        case VITALS_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        case VITALS_ACTION.CURRENT:
            let id = get(action, "id", null);
            let number = get(action, "number", null);
            const oldArray = get(state, 'current', []);
            oldArray.push(
                {
                    id: id,
                    number: number
                }
            );
            return {
                ...state,
                loading: false,
                current: oldArray,
            };
        default:
            return state;
    }
}