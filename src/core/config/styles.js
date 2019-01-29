import { createMuiTheme } from '@material-ui/core/styles';

import backgroundImage from "../../version/images/Artboard.png";
import cardBackgroundImage from "../../version/images/blue-ring-01.png";

import { MAIN_THEME_COLOR } from "../../version/config/theme.config";

export const ITEMS_PER_PAGE = 10;

const CORE_MAIN_COLOR = "#0D672F";

const currentThemeColor = MAIN_THEME_COLOR ? MAIN_THEME_COLOR : CORE_MAIN_COLOR;

/**
 * This component returns theme settings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
export const currentTheme = createMuiTheme({
    global: {
        fontColor: currentThemeColor,
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