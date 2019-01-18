import backgroundImage from "../images/blue-ring-01.png";

/**
 * This component returns stylesheet for table header
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export default {
    tableHeaderBlock: {
        background: 'url(' + backgroundImage + ') 0 0 repeat',
        backgroundSize: "cover",
        color: "white",
        paddingLeft: "14px",
        paddingTop: "25px",
        paddingBottom: "14px"
    },
    title: {
        marginTop: "0px",

    }
};