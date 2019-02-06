import { connect } from 'react-redux';

import ThemeTopbar from "../common/Topbar";
import ThemeFooter from "../common/Footer";
import HomePage from "../../core/pages/PatientsList";

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
    homePage: HomePage,
};

export const shortMenuItems = {
    hasCharts: false,
    hasPatients: true,
};

export const MAIN_THEME_COLOR = "#000080";