export default theme => ({
    formGroup: {
        width: "98%",
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        boxSizing: "border-box",
    },
    smallFormGroup: {
        display: "inline-block",
        width: "49%",
        paddingLeft: 10,
        paddingRight: 10,
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
    },
});
