import get from "lodash/get";
import DeepMerge from 'deepmerge';

import { createMuiTheme } from '@material-ui/core/styles';
import { themeImages } from "../../version/config/theme.config";

export const ITEMS_PER_PAGE = 10;

const defaultLightPalette = {
    type: 'light',
    mainColor: "#0D672F",
    dangerColor: "#da534f",
    disabledColor: "#e9e4e4",
    viewButton: "#30ad57",
    disabledColor: "#e9e4e4",
    borderColor: "#e5e5e5",
    paperColor: "#fff",
    fontColor: "#000",
};

const defaultDarkPalette = {
    type: 'dark',
    mainColor: "#000",
    dangerColor: "#000",
    disabledColor: "#e9e4e4",
    viewButton: "#000",
    disabledColor: "#e9e4e4",
    borderColor: "#000",
    paperColor: "#fff",
    fontColor: "#000",
    background: "#fff",
    text: "#000",
    divider: "#000",
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
    let result = themeColor;
    if (cardBackgroundImage) {
        result = `url(${cardBackgroundImage}) 0 0 repeat`;
    }
    return (isContrastMode) ? "#000" : result;
}

function getCurrentPalette(isContrastMode) {
    return isContrastMode
        ? DeepMerge(defaultDarkPalette, window.config.darkPalette)
        : DeepMerge(defaultLightPalette, window.config.lightPalette);
}

/**
 * This function returns current theme settings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
export function getCurrentTheme(isContrastMode) {
    const backgroundImage = isContrastMode ? null : get(themeImages, 'backgroundImage', null);
    const palette = getCurrentPalette(isContrastMode);
    return createMuiTheme({
        palette: palette,
        typography: {
            fontFamily: '"HK Grotesk", Arial, sans-serif',
            fontSize: 14,
        },
        tableHeader: {
            tableHeaderBlock: {
                background: getCardBackground(isContrastMode, palette.mainColor),
            },
        },
        patientSummaryPanel: {
            container: {
                background: `url(${backgroundImage})`,
            },
            topBlock: {
                background: getCardBackground(isContrastMode, palette.mainColor),
            }
        },
        overrides: {
            MuiInput: {
                root: {
                    border: `1px solid ${palette.borderColor}`,
                }
            },
            MuiList: {
                root: {
                    backgroundColor: palette.paperColor,
                }
            },
            MuiPaper: {
                elevation1: {
                    boxShadow: "none",
                    backgroundColor: palette.paperColor,
                }
            },
            MuiTable: {
                root: {
                    backgroundColor: palette.paperColor,
                    border: `1px solid ${palette.borderColor}`,
                }
            },
            MuiTableHead: {
                root: {
                    backgroundColor: palette.borderColor,
                    color: palette.fontColor,
                }
            },
            MuiTableRow: {
                head: {
                    height: 48,
                }
            },
            MuiTableCell: {
                head: {
                    color: palette.fontColor,
                    fontSize: 16,
                    fontWeight: 800,
                },
                paddingNone: {
                    paddingLeft: 10,
                }
            },
            MuiTypography: {
                body1: {
                    fontSize: 15,
                }
            },
        }
    });
}
