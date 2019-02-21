import feedsListSagas from "./feedsListSagas";
import feedsRssSagas from "./feedsRssSagas";

import createSynopsisSagas from "../../core/sagas/createSynopsisSagas";
import {
    SYNOPSIS_VACCINATIONS_ACTION, synopsisVaccinationsAction,
    SYNOPSIS_TOP_THREE_THINGS_ACTION, synopsisTopThreeThingsAction,
} from "../actions/synopsisActions";

/**
 * This componenr returns array of version sagas
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {array}
 */
export default [
    feedsListSagas,
    feedsRssSagas,
    createSynopsisSagas(SYNOPSIS_VACCINATIONS_ACTION, synopsisVaccinationsAction, 'vaccinations'),
    createSynopsisSagas(SYNOPSIS_TOP_THREE_THINGS_ACTION, synopsisTopThreeThingsAction, 'top3Things'),
];
