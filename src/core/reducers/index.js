import { combineReducers } from 'redux';

// CORE CUSTOM REDUCERS
import initialize from "./initializeReducer";
import patientsStatistic from "./patientsStatisticReducer";
import patientInfo from "./patientInfoReducer";
import showMode from "./showModeReducer";
import showHeadings from "./showHeadingsReducer";
import userInfo from "./userInfoReducer";

// LINK TO NON-CORE CUSTOM REDUCERS
import nonCoreReducers from "../../version/reducers";

const coreReducers = {
    initialize,
    patientInfo,
    patientsStatistic,
    showMode,
    showHeadings,
    userInfo,
};

const reducers = Object.assign({}, coreReducers, nonCoreReducers);

export default combineReducers(reducers);