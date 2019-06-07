import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import VersionCreateButton from "../buttons/VersionCreateButton";

const styles = theme => ({
    emptyBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 48,
        backgroundColor: theme.palette.paperColor,
        textAlign: "center",
        borderBottom: `1px solid ${theme.palette.borderColor}`,
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
    },
});

const EmptyRow = ({ classes, versionsInfo, toggleMode, isLoading }) => (
    <React.Fragment>
        <div className={classes.emptyBlock}>
            <Typography>
                { isLoading ? 'Loading...' : 'No Records found' }
            </Typography>
        </div>
        <div>
            { !isLoading && <VersionCreateButton toggleMode={toggleMode} /> }
        </div>
    </React.Fragment>
);

export default withStyles(styles)(EmptyRow);
