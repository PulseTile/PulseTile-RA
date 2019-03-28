import get from "lodash/get";
import DeepMerge from 'deepmerge';

import { createMuiTheme } from '@material-ui/core/styles';
import { themeImages } from "../../version/config/theme.config";

export const ITEMS_PER_PAGE = 10;

const defaultLightPalette = {
    type: 'light',
    mainColor: "#0D672F",
    dangerColor: "#da534f",
    viewButton: "#30ad57",
    disabledColor: "#e9e4e4",
};

const defaultDarkPalette = {
    type: 'dark',
    mainColor: "#000",
    dangerColor: "#000",
    viewButton: "#000",
    disabledColor: "#e9e4e4",
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
    const backgroundImage = get(themeImages, 'backgroundImage', null);
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
                    border: "1px solid #e5e5e5"
                }
            },
            MuiList: {
                root: {
                    backgroundColor: "#fff",
                }
            },
            MuiPaper: {
                elevation1: {
                    boxShadow: "none",
                    backgroundColor: "#fafafa",
                }
            },
            MuiTable: {
                root: {
                    backgroundColor: "#fff",
                    border: "1px solid #e5e5e5",
                }
            },
            MuiTableHead: {
                root: {
                    backgroundColor: "#e5e5e5",
                    color: "#000",
                }
            },
            MuiTableRow: {
                head: {
                    height: 48,
                }
            },
            MuiTableCell: {
                head: {
                    color: "#000",
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
