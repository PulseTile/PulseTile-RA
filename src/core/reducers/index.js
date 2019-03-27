import { combineReducers } from 'redux';

import showHeadings from "./showHeadingsReducer";
import createCustomReducer from "./createCustomReducer";
import httpErrorReducer from "./httpErrorReducer";

import {
    SYNOPSIS_ALLERGIES_ACTION,
    SYNOPSIS_CONTACTS_ACTION,
    SYNOPSIS_MEDICATIONS_ACTION,
    SYNOPSIS_PROBLEMS_ACTION
} from "../actions/synopsisActions";
import { INITIALIZE_ACTION } from "../actions/initializeAction";
import { DEMOGRAPHICS_ACTION } from "../actions/demographicsAction";
import { PATIENT_INFO } from "../actions/patientInfoAction";
import { PATIENTS_STATISTIC } from "../actions/patientsStatisticAction";
import { USER_INFO_ACTION } from "../actions/userInfoAction";
import { SHOW_MODE_ACTION } from "../actions/showModeAction";

// LINK TO NON-CORE CUSTOM REDUCERS
import nonCoreReducers from "../../version/reducers";

const coreReducers = {
    allergiesSynopsis: createCustomReducer(SYNOPSIS_ALLERGIES_ACTION, "data.synopsis"),
    contactsSynopsis: createCustomReducer(SYNOPSIS_CONTACTS_ACTION, "data.synopsis"),
    medicationsSynopsis: createCustomReducer(SYNOPSIS_MEDICATIONS_ACTION, "data.synopsis"),
    problemsSynopsis: createCustomReducer(SYNOPSIS_PROBLEMS_ACTION, "data.synopsis"),
    initialize: createCustomReducer(INITIALIZE_ACTION, "data"),
    demographics: createCustomReducer(DEMOGRAPHICS_ACTION, "data.demographics"),
    httpErrors: httpErrorReducer,
    patientInfo: createCustomReducer(PATIENT_INFO, "data"),
    patientsStatistic: createCustomReducer(PATIENTS_STATISTIC, "data"),
    showMode: createCustomReducer(SHOW_MODE_ACTION, "data"),
    showHeadings,
    userInfo: createCustomReducer(USER_INFO_ACTION, "data"),
};

const reducers = Object.assign({}, coreReducers, nonCoreReducers);

export default combineReducers(reducers);