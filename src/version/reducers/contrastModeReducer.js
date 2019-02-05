import { CONTRAST_MODE_ACTION } from "../actions/contrastModeAction";

const initialState = {
    data: false,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CONTRAST_MODE_ACTION.REQUEST:
            return {
                ...state,
                loading: false,
                data: !state.data,
            };
        default:
            return state;
    }
}