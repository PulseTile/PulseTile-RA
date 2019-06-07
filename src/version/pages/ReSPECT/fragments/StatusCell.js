import React from "react";

import { withStyles } from '@material-ui/core/styles';
import { STATUS_INCOMPLETE, STATUS_EDITING, STATUS_COMPLETED, STATUS_NONE } from "../statuses";

const styles = {
    tableCellInpogress: {
        color: '#7bb0e5',
        fontSize: 14,
        fontWeight: 800,
    },
    tableCellCompleted: {
        color: '#30ad57',
        fontSize: 14,
        fontWeight: 800,
    },
};

const StatusCell = ({ classes, item, currentRow, status, isVersionInfo }) => {

    // For the sections 1 and 10 in version info view mode
    if ((isVersionInfo && item.id === 1) || item.id === 10 || status === STATUS_NONE) {
        return (
            <span className={classes.tableCellCompleted}>{STATUS_NONE}</span>
        );
    }

    if (!isVersionInfo && item.id === currentRow) {
        return (
            <span className={classes.tableCellInpogress}>{STATUS_EDITING}</span>
        );
    } else if (status === STATUS_COMPLETED) {
        return (
            <span className={classes.tableCellCompleted}>{STATUS_COMPLETED}</span>
        );
    }
    return (
        <span>{STATUS_INCOMPLETE}</span>
    );
};

export default withStyles(styles)(StatusCell);