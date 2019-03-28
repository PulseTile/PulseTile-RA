import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

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
    }
});

const EmptyListBlock = ({ classes }) => (
    <div className={classes.emptyBlock}>
        <Typography>No Records found</Typography>
    </div>
);

export default withStyles(styles)(EmptyListBlock);
