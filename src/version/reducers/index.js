import contrastMode from "./contrastModeReducer";
import selectedFeedsList from "./selectedFeedsReducer";
import feedsRss from "./feedsRssReducer";
import transferOfCareReducer from "./transferOfCareReducer";

import {
    SYNOPSIS_TOP_THREE_THINGS_ACTION,
    SYNOPSIS_VACCINATIONS_ACTION
} from "../actions/synopsisActions";
import { FEEDS_LIST_ACTION } from "../actions/feedsListAction";

import createCustomReducer from "../../core/reducers/createCustomReducer";
import vitalsReducer from "./vitalsReducer";

/**
 * This component returns version reducers
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export default {
    vaccinationsSynopsis: createCustomReducer(SYNOPSIS_VACCINATIONS_ACTION, "data.synopsis"),
    top3ThingsSynopsis: createCustomReducer(SYNOPSIS_TOP_THREE_THINGS_ACTION, "data.synopsis"),
    contrastMode,
    feedsList: createCustomReducer(FEEDS_LIST_ACTION, "data"),
    selectedFeedsList,
    feedsRss,
    transferOfCare: transferOfCareReducer,
    vitals: vitalsReducer
};
