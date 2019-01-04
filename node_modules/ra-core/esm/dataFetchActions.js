export var GET_LIST = 'GET_LIST';
export var GET_ONE = 'GET_ONE';
export var GET_MANY = 'GET_MANY';
export var GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
export var CREATE = 'CREATE';
export var UPDATE = 'UPDATE';
export var UPDATE_MANY = 'UPDATE_MANY';
export var DELETE = 'DELETE';
export var DELETE_MANY = 'DELETE_MANY';
export var fetchActionsWithRecordResponse = [GET_ONE, CREATE, UPDATE, DELETE];
export var fetchActionsWithArrayOfIdentifiedRecordsResponse = [
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
];
export var fetchActionsWithArrayOfRecordsResponse = fetchActionsWithArrayOfIdentifiedRecordsResponse.concat([
    UPDATE_MANY,
    DELETE_MANY,
]);
export var fetchActionsWithTotalResponse = [GET_LIST, GET_MANY_REFERENCE];
