import React from "react";

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    mainBlock: {
        height: 16,
        width: 16,
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.mainColor
    },
    insideBlock: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: theme.palette.mainColor
    }
});

const RenderTrack = ({ classes, props, isDragged }) => {
    return (
        <div {...props} className={classes.mainBlock}></div>
    );
};

export default withStyles(styles)(RenderTrack);
