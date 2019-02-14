import { all } from 'redux-saga/effects';

// CORE SAGAS
import allergiesSynopsisSagas from "./allergiesSynopsisSagas";
import contactsSynopsisSagas from "./contactsSynopsisSagas";
import medicationsSynopsisSagas from "./medicationsSynopsisSagas";
import problemsSynopsisSagas from "./problemsSynopsisSagas";
import initializeSagas from "./initializeSagas";
import demographicsSagas from "./demographicsSagas";
import patientInfoSagas from "./patientInfoSagas";
import patientsStatisticSagas from "./patientsStatisticSagas";
import showModeSagas from "./showModeSagas";
import showHeadingsSagas from "./showHeadingsSagas";
import userInfoSagas from "./userInfoSagas";

// LINK TO NON-CORE SAGAS
import nonCoreSagas from "../../version/sagas";

const coreSagas = [
    allergiesSynopsisSagas,
    contactsSynopsisSagas,
    medicationsSynopsisSagas,
    problemsSynopsisSagas,
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
