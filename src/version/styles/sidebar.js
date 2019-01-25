import { MAIN_THEME_COLOR } from "../config/theme.config";

export default {
    sidebarBlock: {
        maxWidth: "240px",
        '& div': {
            marginTop: 0,
        },
    },
    menuBlock: {
        border: "1px solid #e5e5e5",
    },
    menuItem: {
        display: "block",
        color: MAIN_THEME_COLOR,
        borderBottom: "1px solid #e5e5e5",
        '&:hover': {
            backgroundColor: MAIN_THEME_COLOR,
            color: "white",
        },
    },
    menuItemSelected: {
        display: "block",
        backgroundColor: MAIN_THEME_COLOR + " !important",
        color: "white",
        borderBottom: "1px solid #e5e5e5",
    },
}