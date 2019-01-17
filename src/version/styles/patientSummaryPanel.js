/**
 * This component returns stylesheet for Patient Summary panel
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export default {
    card: {
        display: "inline-block",
        width: "calc(25% - 20px)",
        float: "left",
        margin: "10px",
        boxSizing: "border-box"
    },
    topBlock: {
        display: "flex",
        flexDirection: "column",
        height: "100px",
        backgroundColor: "#2196f3",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
    },
    icon: {
        marginBottom: "10px",
    },
    title: {
        marginBottom: "0px",
    },
    list: {
        padding: "0px",
    },
    media: {
        "background-color": "#2196f3"
    }
};