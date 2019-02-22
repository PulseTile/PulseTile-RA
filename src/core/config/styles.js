import get from "lodash/get";
import { createMuiTheme } from '@material-ui/core/styles';
import { themeImages } from "../../version/config/theme.config";

export const ITEMS_PER_PAGE = 10;

const defaultTheme = {
    mainColor: "#0D672F",
    dangerColor: "#da534f",
    contrastColor: "#000",
};

/**
 * This function defined background-rule for Patient Summary panels and for table headings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {boolean} isContrastMode
 * @param {string}  themeColor
 * @return {string}
 */
function getCardBackground(isContrastMode, themeColor) {
    const cardBackgroundImage = get(themeImages, 'cardBackgroundImage', null);
    let result = themeColor.mainColor;
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
    const themeColor = (window && window.config) ? Object.assign({}, defaultTheme, window.config.theme) : defaultTheme;
    const cardBackground = getCardBackground(isContrastMode, themeColor);
    const lightPalette = {
        type: 'light',
        mainColor: themeColor.mainColor,
        dangerColor: themeColor.dangerColor,
    };
    const darkPalette = {
        type: 'dark',
        mainColor: themeColor.contrastColor,
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
