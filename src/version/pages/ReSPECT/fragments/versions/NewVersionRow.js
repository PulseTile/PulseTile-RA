import React from "react";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { getAuthorName } from "../../functions";

const styles = {
    rowInProgress: {
        '& td span': {
            fontWeight: 600,
        },
    },
};

const NewVersionRow = ({ classes, versionsNumber, toggleMode }) => {
    return (
        <TableRow className={classes.rowInProgress} onClick={() => toggleMode()}>
            <TableCell scope="row" padding="none">
                <span>{versionsNumber}</span>
            </TableCell>
            <TableCell scope="row" padding="none">
                <span>{moment().format('DD-MMM-YYYY')}</span>
            </TableCell>
            <TableCell scope="row" padding="none">
                <span>{moment().format('HH:mm')}</span>
            </TableCell>
            <TableCell align="right">
                <span>New</span>
            </TableCell>
            <TableCell align="right">
                <span>{getAuthorName()}</span>
            </TableCell>
        </TableRow>
    );
};

export default withStyles(styles)(NewVersionRow);
