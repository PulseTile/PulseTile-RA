import allergiesSynopsisSagas from "./allergiesSynopsisSagas";
import contactsSynopsisSagas from "./contactsSynopsisSagas";
import medicationsSynopsisSagas from "./medicationsSynopsisSagas";
import problemsSynopsisSagas from "./problemsSynopsisSagas";

export default function* rootSaga() {

    const sagas = [
        allergiesSynopsisSagas,
        contactsSynopsisSagas,
        medicationsSynopsisSagas,
        problemsSynopsisSagas,
    ];

    yield sagas;
}