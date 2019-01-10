import { combineReducers } from 'redux';

// CORE CUSTOM REDUCERS
import allergiesSynopsis from "./allergiesSynopsisReducer";
import contactsSynopsis from "./contactsSynopsisReducer";
import medicationsSynopsis from "./medicationsSynopsisReducer";
import problemsSynopsis from "./problemsSynopsisReducer";
import patientsStatistic from "./patientsStatisticReducer";
import patientInfo from "./patientInfoReducer";

// LINK TO NON-CORE CUSTOM REDUCERS
import nonCoreReducers from "../../version/reducers";

const coreReducers = {
    allergiesSynopsis,
    contactsSynopsis,
    medicationsSynopsis,
    problemsSynopsis,
    patientInfo,
    patientsStatistic
};

const reducers = Object.assign(coreReducers, nonCoreReducers);

export default combineReducers(reducers);