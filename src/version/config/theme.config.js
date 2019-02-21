import { connect } from 'react-redux';

import backgroundImage from "../../version/images/Artboard.png";
import cardBackgroundImage from "../../version/images/blue-ring-01.png";

import ThemeTopbar from "../common/Topbar";
import ThemeFooter from "../common/Footer";
import FeedsSelectors from "../plugins/Feeds/FeedsSelectors";
import FeedsPanels from "../plugins/Feeds/FeedsPanels";
import PatientSummary from "../../core/pages/PatientSummary";

/**
 * Order of menu items for the current theme
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {array}
 */
export const resourceOrder = [
    'problems',
    'medications',
    'vaccinations',
    'allergies',
    'contacts',
    'top3Things'
];

export const themeCommonElements = {
    topbar: ThemeTopbar,
    footer: ThemeFooter,
    feedsSelectors: FeedsSelectors,
    feedsPanels: FeedsPanels,
    homePage: PatientSummary,
};

export const themeImages = {
    backgroundImage: backgroundImage,
    cardBackgroundImage: cardBackgroundImage,
};
