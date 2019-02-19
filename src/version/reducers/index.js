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
    contrastMode,
    feedsList,
    selectedFeedsList,
    feedsRss,
};
