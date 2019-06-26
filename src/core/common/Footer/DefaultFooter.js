import React from "react";
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia";

import footerLogo from "../../images/ripple-foundation-logo-footer.png";

const styles = theme => ({
    footerBlock: {
        [theme.breakpoints.only('xs')]: {
            display: 'none',
        },
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: "0 0 auto",
        borderTop: `1px solid ${theme.palette.borderColor}`,
        height: 54,
        boxSizing: "border-box",
        color: "#5c5c5c",
        backgroundColor: "#fff",
        paddingTop: 12,
        paddingBottom: 13,
        paddingLeft: 14,
        paddingRight: 14,
    },
    copyright: {
        fontSize: 12,
    },
    supportedBy: {
        marginRight: 10,
        fontSize: 12,
    },
    footerLogo: {
        width: "auto",
        maxWidth: "100%",
    },
    emptyBlock: {
        flexGrow: 1,
    },
});

/**
 * This component returns custom default footer
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const DefaultFooter = ({ classes }) => {
    return (
        <footer className={classes.footerBlock}>
            <Typography className={classes.copyright}>Transforming Usability</Typography>
            <div className={classes.emptyBlock}></div>
            <React.Fragment>
                <Typography className={classes.supportedBy}>Supported by</Typography>
                <Link to="/">
                    <CardMedia
                        className={classes.footerLogo}
                        component="img"
                        alt="Pulse Tile"
                        height="29px"
                        image={footerLogo}
                        title="Pulse Tile"
                    />
                </Link>
            </React.Fragment>
        </footer>
    );
};

export default withStyles(styles)(DefaultFooter);
