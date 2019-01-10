// CORE SAGAS
import patientInfo from "./patientInfoSagas";
import patientsStatisticSagas from "./patientsStatisticSagas";
import synopsisSagas from "./synopsisSagas";

// LINK TO NON-CORE SAGAS
import nonCoreSagas from "../../version/sagas";

/**
 * This function unites core and non-core sagas and returns total array
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
export default function* rootSaga() {

    const coreSagas = [
        patientInfo,
        patientsStatisticSagas,
        // synopsisSagas
    ];

    const sagas = coreSagas.concat(nonCoreSagas);

    yield sagas;
}