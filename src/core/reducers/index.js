import { combineReducers } from 'redux';
import allergiesSynopsis from "./allergiesSynopsisReducer";
import contactsSynopsis from "./contactsSynopsisReducer";
import medicationsSynopsis from "./medicationsSynopsisReducer";
import problemsSynopsis from "./problemsSynopsisReducer";

const reducers = {
    allergiesSynopsis,
    contactsSynopsis,
    medicationsSynopsis,
    problemsSynopsis,
};

export default combineReducers(reducers);