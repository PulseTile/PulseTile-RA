import get from "lodash/get";

import { COLUMNS_TOGGLING_ACTION } from "../../core/actions/columnsTogglingAction";

const initialState = {
    data: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case COLUMNS_TOGGLING_ACTION.TOGGLE:
            const resource = action.resource;
            const columnName = action.columnName;
            const value = action.value;
            const currentList = get(state.data, resource, []);
            if (value) {
                let index = currentList.indexOf(columnName);
                currentList.splice(index, 1);
            } else if (currentList.indexOf(columnName) === -1) {
                currentList.push(columnName);
            }
            return {
                ...state,
                data: Object.assign({}, state.data, {
                    [resource]: currentList,
                }),
            };

        case COLUMNS_TOGGLING_ACTION.REMOVE:
            return {
                ...state,
                data: null,
            };

        default:
            return state;
    }
}