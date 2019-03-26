import backgroundImage from "../../version/images/Artboard.png";

import ThemeTopbar from "../common/Topbar";
import ThemeFooter from "../common/Footer";
import FeedsSelectors from "../plugins/Feeds/FeedsSelectors";
import FeedsPanels from "../plugins/Feeds/FeedsPanels";
import Charts from "../../core/pages/Charts";

export const themeShortMenu = [];

export const themeFullMenu = [];

export const themeCommonElements = {
    topbar: ThemeTopbar,
    footer: ThemeFooter,
    feedsSelectors: FeedsSelectors,
    feedsPanels: FeedsPanels,
    homePage: Charts,
};

export const themeImages = {
    backgroundImage: backgroundImage,
};
