import React from "react";

import { withStyles } from '@material-ui/core/styles';
import { STATUS_INCOMPLETE, STATUS_EDITING, STATUS_COMPLETED } from "../statuses";

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