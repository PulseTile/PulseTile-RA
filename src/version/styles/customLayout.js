import backgroundImage from "../images/Artboard.png";

/**
 * This component returns additional theme stylesheet for custom layout
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export default {
    content: {
        background: 'url(' + backgroundImage + ')',
        backgroundSize: "cover",
    },
};