import allergiesSynopsisSagas from "./allergiesSynopsisSagas";
import contactsSynopsisSagas from "./contactsSynopsisSagas";
import medicationsSynopsisSagas from "./medicationsSynopsisSagas";
import problemsSynopsisSagas from "./problemsSynopsisSagas";

import nonCoreSagas from "../../version/sagas";

export default function* rootSaga() {

    const coreSagas = [
        allergiesSynopsisSagas,
        contactsSynopsisSagas,
        medicationsSynopsisSagas,
        problemsSynopsisSagas,
    ];

    const sagas = coreSagas.concat(nonCoreSagas);

    yield sagas;
}