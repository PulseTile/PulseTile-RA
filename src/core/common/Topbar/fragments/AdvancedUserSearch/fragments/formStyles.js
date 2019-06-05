export default theme => ({
    formGroup: {
        width: "98%",
        paddingTop: 5,
        paddingLeft: 10,
        boxSizing: "border-box",
    },
    smallFormGroup: {
        display: "inline-block",
        width: "49%",
        paddingLeft: 10,
        paddingTop: 5,
        boxSizing: "border-box",
    },
    formLabel: {
        display: "block",
        fontWeight: 800,
        color: "#000",
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
    },
    formInput: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
    },
    formInputRight: {
        width: '100%',
        height: 25,
        marginLeft: 10,
    },
    formSelect: {
        width: '100%',
        height: 30,
        paddingLeft: 10,
        backgroundColor: "#fff",
    },
    formControlLabel: {
        marginBottom: 10,
    },
    radioGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: 25,
    },
    rangeLine: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        marginLeft: 10,
    },
    searchQueryBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rangeOutput: {
        marginTop: 10,
    },
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: theme.palette.toolbarColor,
        marginTop: 10,
    },
    closeButton: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.dangerColor,
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.dangerColor,
            backgroundColor: theme.palette.paperColor,
        },
    },
    searchButton: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.secondaryMainColor,
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.secondaryMainColor,
            backgroundColor: theme.palette.paperColor,
        },
    }
});
