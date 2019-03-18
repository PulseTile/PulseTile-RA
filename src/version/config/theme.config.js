import ThemeTopbar from "../common/Topbar";
import PatientsList from "../../core/pages/PatientsList";

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
    homePage: PatientsList,
    isFooterAbsent: false,
};

export const themeImages = {};