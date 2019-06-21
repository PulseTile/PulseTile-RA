import { combineReducers } from 'redux';

import currentPatientReducer from "./currentPatientReducer";
import showHeadings from "./showHeadingsReducer";
import createCustomReducer from "./createCustomReducer";
import httpErrorReducer from "./httpErrorReducer";
import userSearchReducer from "./userSearchReducer";
import toggleColumnsReducer from "./toggleColumnsReducer";
import advancedSearchReducer from "./advancedSearchReducer";
import clinicalQueryReducer from "./clinicalQueryReducer";
import patientsCountReducer from "./patientsCountReducer";
import emergencySummaryReducer from "./emergencySummaryReducer";

import {
    SYNOPSIS_ALLERGIES_ACTION,
    SYNOPSIS_CONTACTS_ACTION,
    SYNOPSIS_MEDICATIONS_ACTION,
    SYNOPSIS_PROBLEMS_ACTION
} from "../actions/synopsisActions";
import { INITIALIZE_ACTION } from "../actions/initializeAction";
import { DEMOGRAPHICS_ACTION } from "../actions/demographicsAction";
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
    showMode: createCustomReducer(SHOW_MODE_ACTION, "data"),
    showHeadings,
    userSearch: userSearchReducer,
    currentPatient: currentPatientReducer,
    toggleColumns: toggleColumnsReducer,
    advancedSearch: advancedSearchReducer,
    clinicalQuery: clinicalQueryReducer,
    patientsCount: patientsCountReducer,
    emergencySummary: emergencySummaryReducer,
};

const reducers = Object.assign({}, coreReducers, nonCoreReducers);

export default combineReducers(reducers);