import React from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography/index";
import Popover from "@material-ui/core/Popover/index";
import IconButton from "@material-ui/core/IconButton/index";
import Tooltip from "@material-ui/core/Tooltip/index";
import TableIcon from '@material-ui/icons/List';
import ChartIcon from '@material-ui/icons/ShowChart';
import TimelineIcon from '@material-ui/icons/AccessTime';
import Divider from "@material-ui/core/Divider/index";

import { MODE_TIMELINE, MODE_TABLE, MODE_CHART } from "../fragments/constants";

const styles = theme => ({
    paper: {
        display: "block",
        width: 150,
        height: 'auto',
        margin: 0,
        padding: 10,
        borderRadius: 0,
    },
    label: {
        paddingLeft: 10,
    },
    icon: {
        paddingLeft: 20,
        color: theme.palette.secondaryMainColor,
    },
});

const ListModePopover = ({ classes, open, anchorEl, handleClose, resourse, changeListMode, hasChart, hasTimetable }) => {
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
                <Typography>TABLES</Typography>
                <Divider />
                <Tooltip title="Table">
                    <IconButton className={classes.icon} onClick={() => changeListMode(MODE_TABLE)}>
                        <TableIcon />
                        <Typography className={classes.label}>{resourse}</Typography>
                    </IconButton>
                </Tooltip>
            </div>

            { hasChart &&
                <div>
                    <Typography>CHARTS</Typography>
                    <Divider />
                    <Tooltip title="Chart">
                        <IconButton className={classes.icon} onClick={() => changeListMode(MODE_CHART)}>
                            <ChartIcon />
                            <Typography className={classes.label}>{resourse}</Typography>
                        </IconButton>
                    </Tooltip>
                </div>
            }

            { hasTimetable &&
                <div>
                    <Typography>TIMELINES</Typography>
                    <Divider />
                    <Tooltip title="Timeline">
                        <IconButton className={classes.icon} onClick={() => changeListMode(MODE_TIMELINE)}>
                            <TimelineIcon />
                            <Typography className={classes.label}>{resourse}</Typography>
                        </IconButton>
                    </Tooltip>
                </div>
            }

        </Popover>
    );
};

export default withStyles(styles)(ListModePopover);
