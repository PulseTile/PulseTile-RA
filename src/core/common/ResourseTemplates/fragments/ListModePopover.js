import React from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography/index";
import Popover from "@material-ui/core/Popover/index";
import IconButton from "@material-ui/core/IconButton/index";
import Tooltip from "@material-ui/core/Tooltip/index";
import TableIcon from '@material-ui/icons/List';
import ChartIcon from '@material-ui/icons/ShowChart';
import TimelineIcon from '@material-ui/icons/Timeline';

import { MODE_TIMELINE, MODE_TABLE, MODE_CHART } from "./constants";

const styles = {
    paper: {
        display: "block",
        width: 100,
        margin: 0,
        paddingLeft: 20,
        borderRadius: 0,
    },
    label: {
        paddingLeft: 10,
    }
};

const ListModePopover = ({ classes, open, anchorEl, handleClose, listMode, changeListMode, hasChart, hasTimetable }) => {
    return (
        <Popover
            open={open}
            classes={{ paper: classes.paper }}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >

            <div>
                <Tooltip title="Table">
                    <IconButton onClick={() => changeListMode(MODE_TABLE)}>
                        <TableIcon />
                        <Typography className={classes.label}>Table</Typography>
                    </IconButton>
                </Tooltip>
            </div>

            { hasChart &&
                <div>
                    <Tooltip title="Chart">
                        <IconButton onClick={() => changeListMode(MODE_CHART)}>
                            <ChartIcon />
                            <Typography className={classes.label}>Chart</Typography>
                        </IconButton>
                    </Tooltip>
                </div>
            }

            { hasTimetable &&
                <div>
                    <Tooltip title="Timeline">
                        <IconButton onClick={() => changeListMode(MODE_TIMELINE)}>
                            <TimelineIcon />
                            <Typography className={classes.label}>Timeline</Typography>
                        </IconButton>
                    </Tooltip>
                </div>
            }

        </Popover>
    );
};

export default withStyles(styles)(ListModePopover);
