import { combineReducers } from 'redux';

// CORE CUSTOM REDUCERS
import patientsStatistic from "./patientsStatisticReducer";
import patientInfo from "./patientInfoReducer";

// LINK TO NON-CORE CUSTOM REDUCERS
import nonCoreReducers from "../../version/reducers";

const coreReducers = {
    patientInfo,
    patientsStatistic
};

const reducers = Object.assign(coreReducers, nonCoreReducers);

export default combineReducers(reducers);