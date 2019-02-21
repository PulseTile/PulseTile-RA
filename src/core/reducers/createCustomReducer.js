import get from "lodash/get";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

/**
 * This function creates custom reducer by action name
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  actionName
 * @param {string} data
 */
export default function createCustomReducer(actionName, data) {
    return (state = initialState, action) => {
        switch (action.type) {
            case actionName.REQUEST:
                return {
                    ...state,
                    loading: true,
                };
            case actionName.SUCCESS:
                return {
                    ...state,
                    loading: false,
                    data: get(action, data, []),
                };
            case actionName.FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: get(action, "error", null),
                };
            default:
                return state;
        }
    }
}