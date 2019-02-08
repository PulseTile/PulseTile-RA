import { all } from 'redux-saga/effects';

// CORE SAGAS
import patientInfoSagas from "./patientInfoSagas";
import patientsStatisticSagas from "./patientsStatisticSagas";
import showModeSagas from "./showModeSagas";
import showHeadingsSagas from "./showHeadingsSagas";
import userInfoSagas from "./userInfoSagas";

// LINK TO NON-CORE SAGAS
import nonCoreSagas from "../../version/sagas";

const coreSagas = [
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
