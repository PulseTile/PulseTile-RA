import contrastModeSagas from "./contrastModeSagas";
import feedsListSagas from "./feedsListSagas";
import feedsRssSagas from "./feedsRssSagas";

/**
 * This componenr returns array of version sagas
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {array}
 */
export default [
    contrastModeSagas,
    feedsListSagas,
    feedsRssSagas,
];
