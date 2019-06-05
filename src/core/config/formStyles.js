export default theme => ({
    customRoot: {
        padding: 0,
        border: 'none',
    },
    formGroup: {
        paddingLeft: 10,
        paddingRight: 10,
        boxSizing: "border-box",
        '& div div input': {
            marginTop: 5,
            border: `1px solid #a8a9a9`,
        },
        '& div div textarea': {
            marginTop: 5,
            border: `1px solid #a8a9a9`,
        },
    },
    customFormLabel: {
        display: "block",
        fontWeight: 800,
        color: theme.palette.fontColor,
        fontSize: 18,
        marginBottom: 15,
    },
    customInput: {
        borderRadius: 0,
        backgroundColor: theme.palette.paperColor,
        border: 'none',
        height: 25,
        paddingLeft: 10,
        paddingTop: 2,
        paddingBottom: 2,
    },
    customTextarea: {
        borderRadius: 0,
        backgroundColor: theme.palette.paperColor,
        border: 'none',
        height: 60,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    customSelector: {
        borderRadius: 0,
        backgroundColor: theme.palette.paperColor,
        border: `1px solid #a8a9a9`,
        paddingLeft: 10,
        marginTop: 5,
        paddingTop: 5,
        paddingBottom: 5,
    }
});