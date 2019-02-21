import get from "lodash/get";
import { createMuiTheme } from '@material-ui/core/styles';
import { themeImages } from "../../version/config/theme.config";

export const ITEMS_PER_PAGE = 10;

export function getCurrentThemeColor(isContrastMode) {
    let currentThemeColor = (window && window.config) ? window.config.mainColor : "#0D672F";
    return (isContrastMode) ? "#000" : currentThemeColor;
}


function getCardBackground(isContrastMode) {
    const cardBackgroundImage = get(themeImages, 'cardBackgroundImage', null);
    let result = (window && window.config) ? window.config.mainColor : "#0D672F";
    if (cardBackgroundImage) {
        result = 'url(' + cardBackgroundImage + ') 0 0 repeat';
    }
    return (isContrastMode) ? "#000" : result;
}

/**
 * This function returns current theme settings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */

export function getCurrentTheme(isContrastMode) {
    const currentThemeColor = getCurrentThemeColor(isContrastMode);
    const backgroundImage = get(themeImages, 'backgroundImage', null);
    const cardBackground = getCardBackground(isContrastMode);
    return createMuiTheme({
        global: {
            mainColor: currentThemeColor,
        },
        sidebar: {
            menuItem: {
                color: currentThemeColor,
                backgroundColorHover: currentThemeColor,
            },
            menuItemSelected: {
                backgroundColor: currentThemeColor + " !important",
            },
        },
        templates: {
            listTemplate: {
                blockTitle: {
                    backgroundColor: currentThemeColor,
                },
                title: {
                    backgroundColor: currentThemeColor,
                },
                tableList: {
                    backgroundColorHover: currentThemeColor + " !important",
                },
                filterInput: {
                    backgroundColor: currentThemeColor,
                },
            },
            createTemplate: {
                blockTitle: {
                    backgroundColor: currentThemeColor,
                },
            },
            editTemplate: {
                blockTitle: {
                    backgroundColor: currentThemeColor,
                },
            },
            showTemplate: {
                expansionPanelSummary: {
                    backgroundColor: currentThemeColor,
                },
            },
        },
        buttons: {
            saveButton: {
                backgroundColor: currentThemeColor,
                border: "1px solid " + currentThemeColor,
                colorHover: currentThemeColor,
            },
            cancelButton: {
                backgroundColor: isContrastMode ? currentThemeColor : "#da534f",
                border: isContrastMode ? ("1px solid " + currentThemeColor) : ("1px solid " + "#da534f"),
                colorHover: isContrastMode ? currentThemeColor : "#da534f",
            },
            listButton: {
                backgroundColor: isContrastMode ? currentThemeColor : "#da534f",
                border: isContrastMode ? ("1px solid " + currentThemeColor) : ("1px solid " + "#da534f"),
                colorHover: isContrastMode ? currentThemeColor : "#da534f",
            },
            createButton: {
                color: currentThemeColor,
                border: "1px solid " + currentThemeColor,
                backgroundColorHover: currentThemeColor,
            },
            editButton: {
                color: currentThemeColor,
                border: "1px solid " + currentThemeColor,
                backgroundColorHover: currentThemeColor,
            },
            pagination: {
                color: currentThemeColor,
                backgroundColorHover: currentThemeColor,
                backgroundColorActive: currentThemeColor,
            },
            logout: {
                backgroundColor: currentThemeColor,
                border: "1px solid " + currentThemeColor,
            }
        },
        tableHeader: {
            tableHeaderBlock: {
                background: cardBackground,
            },
        },
        patientSummaryPanel: {
            media: {
                backgroundColor: currentThemeColor,
            },
            container: {
                background: 'url(' + backgroundImage + ')',
            },
            topBlock: {
                backgroundColor: currentThemeColor,
                background: cardBackground,
            },
        },
    });
}
