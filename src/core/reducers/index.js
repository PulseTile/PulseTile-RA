import { combineReducers } from 'redux';
import allergiesSynopsis from "./allergiesSynopsisReducer";
import contactsSynopsis from "./contactsSynopsisReducer";
import medicationsSynopsis from "./medicationsSynopsisReducer";
import problemsSynopsis from "./problemsSynopsisReducer";

import nonCoreReducers from "../../version/reducers";

const coreReducers = {
    allergiesSynopsis,
    contactsSynopsis,
    medicationsSynopsis,
    problemsSynopsis,
};

const reducers = Object.assign(coreReducers, nonCoreReducers);

export default combineReducers(reducers);