
import get from "lodash/get";
import memoize from "lodash/memoize";
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
    borderColor: "#e5e5e5",
    paperColor: "#fff",
    toolbarColor: "#e5e5e5",
    fontColor: "#000",
};

const defaultDarkPalette = {
    type: 'dark',
    mainColor: "#000",
    dangerColor: "#000",
    viewButton: "#000",
    disabledColor: "#e9e4e4",
    borderColor: "#000",
    paperColor: "#fff",
    fontColor: "#000",
    toolbarColor: "#fff",
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
 * @param {string}  imageName
 * @return {string}
 */
function getBackground(isContrastMode, themeColor, imageName) {
    const cardBackgroundImage = get(themeImages, imageName, null);
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
function getCurrentTheme(isContrastMode) {
    const backgroundImage = isContrastMode ? null : get(themeImages, 'backgroundImage', null);
    const palette = getCurrentPalette(isContrastMode);
    return createMuiTheme({
        palette: palette,
        typography: {
            fontFamily: '"HK Grotesk Regular", Arial, sans-serif',
            fontSize: 14,
        },
        tableHeader: {
            tableHeaderBlock: {
                background: getBackground(isContrastMode, palette.mainColor, 'tableHeaderImage'),
            },
        },
        patientSummaryPanel: {
            container: {
                background: `url(${backgroundImage})`,
            },
            topBlock: {
                background: getBackground(isContrastMode, palette.mainColor, 'cardBackgroundImage'),
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
                    backgroundColor: isContrastMode ? palette.paperColor : palette.borderColor,
                    color: isContrastMode ? palette.paperColor : palette.fontColor,
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
                root: {
                    fontFamily: '"HK Grotesk SemiBold", Arial, sans-serif',
                    fontSize: 17,
                },
                body1: {
                    fontFamily: '"HK Grotesk Regular", Arial, sans-serif',
                    fontSize: 14,
                },
                body2: {
                    fontFamily: '"HK Grotesk SemiBold", Arial, sans-serif',
                    fontSize: 14,
                }
            },
        }
    });
}

export default memoize(getCurrentTheme);