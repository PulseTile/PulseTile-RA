import get from "lodash/get";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

/**
 * This function creates reducer for ReSPECT-plugin actions
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} actionName
 */
export default function createRespectPluginReducer(actionName) {
    return (state = initialState, action) => {
        switch (action.type) {
            case actionName.REQUEST:
                return {
                    ...state,
                    loading: true,
                };
            case actionName.CREATE:
                return {
                    ...state,
                    loading: false,
                    data: action.data
                };
            case actionName.SUCCESS:
                return {
                    ...state,
                    loading: false,
                    data: action.data
                };
            case actionName.FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: get(action, "error", null),
                };
            case actionName.REMOVE:
                return {
                    data: null,
                    loading: false,
                    error: null,
                };
            default:
                return state;
        }
    }
}