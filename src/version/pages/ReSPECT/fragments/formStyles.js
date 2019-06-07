export default theme => ({
    formGroup: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    smallFormGroup: {
        display: "inline-block",
        width: "50%",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    formLabel: {
        display: "block",
        fontWeight: 800,
        color: "#000",
        fontSize: 14,
        marginBottom: 15,
    },
    formInput: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
    },
    formHelpText: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
        lineHeight: "1.3em",
    },
    formHelpTextStreetAddress: {
        marginTop: 10,
        marginBottom: 15,
        fontSize: 14,
        lineHeight: "1.3em",
    },
    formTextarea: {
        width: '98%',
        height: 180,
        padding: 10,
    },
    formControlLabel: {
        marginBottom: 10,
    },
    radioGroup: {
        marginLeft: 25,
    },
    mainFormLabel: {
        display: "block",
        fontWeight: 800,
        color: "#000",
        fontSize: 14,
        marginBottom: 5,
    },
    formSelect: {
        width: '100%',
        height: 30,
        paddingLeft: 10,
        backgroundColor: "#fff",
    },
    titleBlock: {
        paddingLeft: 25,
    },
    firstTitle: {
        marginTop: 20,
        marginBottom: 20,
    },
    secondTitle: {
        marginBottom: 20,
    },
    sectionLink: {
        color: theme.palette.secondaryMainColor,
        fontWeight: 800,
        cursor: "pointer"
    },
    checkbox: {
        float: "left",
    },
    warningBlock: {
        margin: 20,
        border: `2px solid ${theme.palette.dangerColor}`,
        padding: 10,
    }
});