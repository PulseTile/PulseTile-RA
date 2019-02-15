import feedsListSagas from "./feedsListSagas";
import feedsRssSagas from "./feedsRssSagas";
import synopsisVaccinationsSagas from "./synopsisVaccinationsSagas";
import synopsisTopThreeThingsSagas from "./synopsisTopThreeThingsSagas";

/**
 * This componenr returns array of version sagas
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {array}
 */
export default [
    feedsListSagas,
    feedsRssSagas,
    synopsisVaccinationsSagas,
    synopsisTopThreeThingsSagas,
];
