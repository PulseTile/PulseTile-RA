import React from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";

const styles = theme => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        display: "block",
        padding: "5px 10px",
        margin: 0,
        borderRadius: 0,
    },
});

const PopoverInfo = ({ classes, open, anchorEl, handleClose, cityName, healthScore }) => {
    return (
        <Popover
            open={open}
            className={classes.popover}
            classes={{ paper: classes.paper }}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        >
            <Typography variant="h1">{cityName}</Typography>
            <Typography variant="body1">Health score: {healthScore}%</Typography>
        </Popover>
    );
};

export default withStyles(styles)(PopoverInfo);
