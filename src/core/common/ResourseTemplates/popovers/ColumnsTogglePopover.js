import React from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Popover from "@material-ui/core/Popover/index";

const styles = theme => ({
    paper: {
        display: "block",
        width: 400,
        height: 'auto',
        margin: 0,
        padding: 10,
        borderRadius: 0,
    },
});

const ColumnsTogglePopover = ({ classes, open, anchorEl, handleClose, ColumnsTogglingPopover, toggleColumn }) => {
    return (
        <Popover
            open={open}
            classes={{ paper: classes.paper }}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <ColumnsTogglingPopover toggleColumn={toggleColumn} />
        </Popover>
    );
};

export default withStyles(styles)(ColumnsTogglePopover);
