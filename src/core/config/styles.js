import get from "lodash/get";
import { createMuiTheme } from '@material-ui/core/styles';
import { themeImages } from "../../version/config/theme.config";

export const ITEMS_PER_PAGE = 10;

const DEFAULT_CONTRAST_COLOR = "#000";
export const DEFAULT_MAIN_COLOR = "#0D672F";
export const DEFAULT_DANGER_COLOR = "#da534f";

/**
 * This function defined background-rule for Patient Summary panels and for table headings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param isContrastMode
 * @return {string}
 */
function getCardBackground(isContrastMode = false) {
    const cardBackgroundImage = get(themeImages, 'cardBackgroundImage', null);
    let result = (window && window.config) ? window.config.mainColor : DEFAULT_MAIN_COLOR;
    if (cardBackgroundImage) {
        result = `url(${cardBackgroundImage}) 0 0 repeat`;
    }
    return (isContrastMode) ? "#000" : result;
}

/**
 * This function returns current theme settings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
export function getCurrentTheme(isContrastMode) {
    const backgroundImage = get(themeImages, 'backgroundImage', null);
    const cardBackground = getCardBackground(isContrastMode);

    const lightPalette = {
        type: 'light',
        mainColor: (window && window.config) ? window.config.mainColor : DEFAULT_MAIN_COLOR,
        dangerColor: (window && window.config) ? window.config.dangerColor : DEFAULT_DANGER_COLOR,
    };

    const darkPalette = {
        type: 'dark',
        mainColor: (window && window.config) ? window.config.contrastColor : DEFAULT_CONTRAST_COLOR,
        dangerColor: "#fff",
        background: "#fff",
        text: "#000",
        divider: "#000",
    };

    return createMuiTheme({
        palette: isContrastMode ? darkPalette : lightPalette,
        tableHeader: {
            tableHeaderBlock: {
                background: cardBackground,
            },
        },
        patientSummaryPanel: {
            container: {
                background: `url(${backgroundImage})`,
            },
            topBlock: {
                background: cardBackground,
            }
        },
    });
}
