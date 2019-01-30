import { combineReducers } from 'redux';

// CORE CUSTOM REDUCERS
import patientsStatistic from "./patientsStatisticReducer";
import patientInfo from "./patientInfoReducer";
import showMode from "./showModeReducer";
import showHeadings from "./showHeadingsReducer";

// LINK TO NON-CORE CUSTOM REDUCERS
import nonCoreReducers from "../../version/reducers";

const coreReducers = {
    patientInfo,
    patientsStatistic,
    showMode,
    showHeadings,
};

const reducers = Object.assign({}, coreReducers, nonCoreReducers);

export default combineReducers(reducers);