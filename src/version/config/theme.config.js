import { connect } from 'react-redux';

import ThemeTopbar from "../common/Topbar";
import ThemeFooter from "../common/Footer";

/**
 * Order of menu items for the current theme
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {array}
 */
export const resourceOrder = [
    'problems',
    'medications',
    'allergies',
    'contacts',
];

export const themeCommonElements = {
    topbar: ThemeTopbar,
    footer: ThemeFooter,
};

export const MAIN_THEME_COLOR = "#000080";