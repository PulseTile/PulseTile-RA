import { all } from 'redux-saga/effects';

// CORE SAGAS
import currentPatientSagas from "./currentPatientSagas";
import initializeSagas from "./initializeSagas";
import demographicsSagas from "./demographicsSagas";
import httpErrorSagas from "./httpErrorSagas";
import showModeSagas from "./showModeSagas";
import showHeadingsSagas from "./showHeadingsSagas";
import patientsCountSagas from "./patientsCountSagas";
import emergencySummarySagas from "../../core/sagas/emergencySummarySagas";

import createSynopsisSagas from "./createSynopsisSagas";
import {
    SYNOPSIS_ALLERGIES_ACTION, synopsisAllergiesAction,
    SYNOPSIS_CONTACTS_ACTION, synopsisContactsAction,
    SYNOPSIS_MEDICATIONS_ACTION, synopsisMedicationsAction,
    SYNOPSIS_PROBLEMS_ACTION, synopsisProblemsAction
} from "../actions/synopsisActions";

// LINK TO NON-CORE SAGAS
import nonCoreSagas from "../../version/sagas";

const coreSagas = [
    currentPatientSagas,
    createSynopsisSagas(SYNOPSIS_ALLERGIES_ACTION, synopsisAllergiesAction, 'allergies'),
    createSynopsisSagas(SYNOPSIS_CONTACTS_ACTION, synopsisContactsAction, 'contacts'),
    createSynopsisSagas(SYNOPSIS_MEDICATIONS_ACTION, synopsisMedicationsAction, 'medications'),
    createSynopsisSagas(SYNOPSIS_PROBLEMS_ACTION, synopsisProblemsAction, 'problems'),
    initializeSagas,
    demographicsSagas,
    httpErrorSagas,
    showModeSagas,
    showHeadingsSagas,
    patientsCountSagas,
    emergencySummarySagas,
];

const mergeSagas = coreSagas.concat(nonCoreSagas);

export default function* rootSaga() {
    yield all(mergeSagas);
}