import vaccinationsSynopsis from "./synopsisVaccinationsReducer";
import top3ThingsSynopsis from "./synopsisTopThreeThingsReducer";
import contrastMode from "./contrastModeReducer";
import feedsList from "./feedsListReducer";
import selectedFeedsList from "./selectedFeedsReducer";
import feedsRss from "./feedsRssReducer";

/**
 * This component returns version reducers
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export default {
    vaccinationsSynopsis,
    top3ThingsSynopsis,
    contrastMode,
    feedsList,
    selectedFeedsList,
    feedsRss,
};
