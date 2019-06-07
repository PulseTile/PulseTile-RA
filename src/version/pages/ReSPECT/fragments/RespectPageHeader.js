import React from "react";
import { translate } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia";

import respectLogo from "../images/respect-small.png";

const styles = theme => ({
    tableHeaderBlock: {
        background: theme.tableHeader.tableHeaderBlock.background,
        backgroundSize: "cover",
        color: "white",
        paddingLeft: "14px",
        paddingTop: "25px",
        paddingBottom: "14px"
    },
    title: {
        marginTop: 0,
        color: "#fff",
        fontSize: 24,
        fontWeight: 800,
    },
    description: {
        marginTop: 10,
        color: "#fff",
    },
    respectLogo: {
        width: "auto",
    }
});

/**
 * This component returns header for table
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 */
const RespectPageHeader = ({ classes }) => (
    <div className={classes.tableHeaderBlock} >
        <CardMedia
            className={classes.respectLogo}
            component="img"
            alt="ReSPECT"
            image={respectLogo}
            title="ReSPECT"
        />
        <Typography className={classes.description}>
            Creating individualised recomendations for a person's clinical care in emergency situation
        </Typography>
    </div>
);

export default withStyles(styles)(RespectPageHeader);