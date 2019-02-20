import { all } from 'redux-saga/effects';

// CORE SAGAS
import initializeSagas from "./initializeSagas";
import demographicsSagas from "./demographicsSagas";
import patientInfoSagas from "./patientInfoSagas";
import patientsStatisticSagas from "./patientsStatisticSagas";
import showModeSagas from "./showModeSagas";
import showHeadingsSagas from "./showHeadingsSagas";
import userInfoSagas from "./userInfoSagas";

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
    createSynopsisSagas(SYNOPSIS_ALLERGIES_ACTION, synopsisAllergiesAction, 'allergies'),
    createSynopsisSagas(SYNOPSIS_CONTACTS_ACTION, synopsisContactsAction, 'contacts'),
    createSynopsisSagas(SYNOPSIS_MEDICATIONS_ACTION, synopsisMedicationsAction, 'medications'),
    createSynopsisSagas(SYNOPSIS_PROBLEMS_ACTION, synopsisProblemsAction, 'problems'),
    initializeSagas,
    demographicsSagas,
    patientInfoSagas,
    patientsStatisticSagas,
    showModeSagas,
    showHeadingsSagas,
    userInfoSagas,
];

const mergeSagas = coreSagas.concat(nonCoreSagas);

export default function* rootSaga() {
    yield all(mergeSagas);
}
