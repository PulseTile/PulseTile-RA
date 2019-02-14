import { combineReducers } from 'redux';

// CORE CUSTOM REDUCERS
import allergiesSynopsis from "./allergiesSynopsisReducer";
import contactsSynopsis from "./contactsSynopsisReducer";
import medicationsSynopsis from "./medicationsSynopsisReducer";
import problemsSynopsis from "./problemsSynopsisReducer";
import initialize from "./initializeReducer";
import demographics from "./demographicsReducer";
import patientsStatistic from "./patientsStatisticReducer";
import patientInfo from "./patientInfoReducer";
import showMode from "./showModeReducer";
import showHeadings from "./showHeadingsReducer";
import userInfo from "./userInfoReducer";

// LINK TO NON-CORE CUSTOM REDUCERS
import nonCoreReducers from "../../version/reducers";

const coreReducers = {
    allergiesSynopsis,
    contactsSynopsis,
    medicationsSynopsis,
    problemsSynopsis,
    initialize,
    demographics,
    patientInfo,
    patientsStatistic,
    showMode,
    showHeadings,
    userInfo,
};

const reducers = Object.assign({}, coreReducers, nonCoreReducers);

export default combineReducers(reducers);