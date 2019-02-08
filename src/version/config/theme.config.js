import { connect } from 'react-redux';

import ThemeTopbar from "../common/Topbar";
import ThemeFooter from "../common/Footer";
import NonCoreSelectors from "../plugins/Feeds/VersionSummarySelectors";

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
    nonCoreSelectors: NonCoreSelectors,
};

export const MAIN_THEME_COLOR = "#3596f4";