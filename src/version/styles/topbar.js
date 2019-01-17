/**
 * Stylesheet for top part of Topbar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export const topPartStyles = {
    topPart: {
        display: "flex",
        backgroundColor: "white",
        justifyContent: "space-around",
        border: "1px solid #e5e5e5",
        minHeight: "54px",
        padding: 0,
    },
    homeButtonItem: {
        display: "inline-flex",
        position: "relative",
        minHeight: "54px",
        minWidth: "54px",
        backgroundColor: "#3596f4",
        justifyContent: "center",
        alignItems: "center",
    },
    homeButton : {
        color: "white",
    },
    mainLogoItem: {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "9px",
    },
    nhsLogo: {
        width: "auto",
        maxWidth: "100%",
        marginRight: "24px"
    },
    rightBlockItem: {
        display: "inline-flex",
        position: "relative",
        minHeight: "54px",
        minWidth: "54px",
        justifyContent: "center",
        alignItems: "center",
        borderLeft: "1px solid #e5e5e5",
        '&:hover': {
            backgroundColor: "#3596f4",
        },
        '&:active': {
            backgroundColor: "#3596f4",
        },
        '&:hover button': {
            color: "white",
        },
        '&:active button': {
            color: "white",
        },
    },
    rightBlockButton: {
        color: "#3596f4",
    },
    emptyBlock: {
        flexGrow: 1,
    }
};

/**
 * Stylesheet for low part of Topbar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export const lowPartStyles = {
    lowPart: {
        display: "flex",
        border: "1px solid #e5e5e5",
        padding: 0,
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    menuButtonBlock: {
        display: "inline-flex",
        position: "relative",
        minWidth: "238px",
        minHeight: "90px",
        borderRight: "1px solid #e5e5e5",
        justifyContent: "center",
        alignItems: "center",
    },
    menuButton: {
        borderRadius: "15px",
        maxHeight: "20px",
        minWidth: "64px",
        color: "#3596f4",
        textTransform: "none",
        backgroundColor: "white",
        '&:hover': {
            backgroundColor: "#3596f4",
            color: "white",
        },
        '&:active': {
            backgroundColor: "#3596f4",
            color: "white",
        },
    },
    title: {
        flexGrow: 1,
        color: "black"
    },
    patientInfo: {
        width: "100%",
        justifyContent: "space-around",
        color: "black",
        padding: "11px 14px",
    },
    patientLeftColumn: {
        display: "inline-block",
    },
    rightFirstColumn: {
        display: "inline-block",
        marginRight: "34px",
    },
    rightSecondColumn: {
        display: "inline-block",
        paddingRight: "3px",
        textAlign: "right",
    },
    patientRightColumn: {
        display: "block",
        float: "right",
    },
};