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

            const currentList = get(state.data, resource, []);

            if (currentList.indexOf(columnName) !== -1) {
                let index = currentList.indexOf(columnName);
                currentList.splice(index, 1);
            } else {
                currentList.push(columnName);
            }

            return {
                ...state,
                data: Object.assign({}, state.data, {
                    [resource]: currentList,
                }),
            };

        default:
            return state;
    }
}