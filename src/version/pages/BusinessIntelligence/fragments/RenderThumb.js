import React from "react";

import { withStyles } from '@material-ui/core/styles/index';

const styles = theme => ({
    mainBlock: {
        height: 16,
        width: 16,
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.secondaryMainColor
    },
    insideBlock: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: theme.palette.secondaryMainColor
    }
});

const RenderTrack = ({ classes, props, isDragged }) => {
    return (
        <div {...props} className={classes.mainBlock}></div>
    );
};

export default withStyles(styles)(RenderTrack);