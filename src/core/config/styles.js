import { createMuiTheme } from '@material-ui/core/styles';

import backgroundImage from "../../version/images/Artboard.png";
import cardBackgroundImage from "../../version/images/blue-ring-01.png";

import { MAIN_THEME_COLOR } from "../../version/config/theme.config";

export const ITEMS_PER_PAGE = 10;

const CORE_MAIN_COLOR = "#0D672F";

function getCurrentThemeColor(isContrastMode) {
    let currentThemeColor = CORE_MAIN_COLOR;
    if (isContrastMode) {
        currentThemeColor = "#000";
    } else if (MAIN_THEME_COLOR) {
        currentThemeColor = MAIN_THEME_COLOR;
    }
    return currentThemeColor;
}

/**
 * This function returns current theme settings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */

export function getCurrentTheme(isContrastMode) {
    const currentThemeColor = getCurrentThemeColor(isContrastMode);
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
        },
        tableHeader: {
            tableHeaderBlock: {
                background: 'url(' + cardBackgroundImage + ') 0 0 repeat',
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
                background: 'url(' + cardBackgroundImage + ') 0 0 repeat',
            },
        },
    });
}
