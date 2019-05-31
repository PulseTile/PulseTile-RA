import { createRequestTypes } from "./functions";

export const COLUMNS_TOGGLING_ACTION = createRequestTypes('COLUMNS_TOGGLING_ACTION', { TOGGLE: 'TOGGLE' });

export const columnsTogglingAction = {
    toggle: (resource, columnName) => ({ type: COLUMNS_TOGGLING_ACTION.TOGGLE, resource, columnName }),
};