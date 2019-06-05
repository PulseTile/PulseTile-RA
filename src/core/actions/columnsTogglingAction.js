import { createRequestTypes } from "./functions";

export const COLUMNS_TOGGLING_ACTION = createRequestTypes('COLUMNS_TOGGLING_ACTION', { TOGGLE: 'TOGGLE', REMOVE: 'REMOVE' });

export const columnsTogglingAction = {
    toggle: (resource, columnName, value) => ({ type: COLUMNS_TOGGLING_ACTION.TOGGLE, resource, columnName, value }),
    remove: data => ({ type: COLUMNS_TOGGLING_ACTION.REMOVE, data }),
};