import React, { Component } from "react";
import get from "lodash/get";
import { Route } from "react-router";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { STATUS_INCOMPLETE, STATUS_COMPLETED, DATE_FORMAT } from "../../statuses";
import StatusCell from "../StatusCell";
import NewVersionRow from "./NewVersionRow";

const styles = theme => ({
    rowCompleted: {
        backgroundColor: "#fff",
    },
    rowInComplete: {
        backgroundColor: "#f1f0f0",
        '& td span': {
            color: "#6d6c6c",
        },
    },
    currentRow: {
        backgroundColor: theme.palette.mainColor,
        '& td span': {
            color: "#fff",
        },
    }
});

class TableBodyBlock extends Component {

    getRowClassName = (status, item) => {
        let result = 'rowInComplete';
        if (status === STATUS_COMPLETED) {
            result = 'rowCompleted';
        }
        return result;
    };

    render() {
        const { classes, currentVersion, toggleMode, showVersion, versionsInfo } = this.props;
        let versionsNumber = Array.isArray(versionsInfo) ? versionsInfo.length : 0;
        return (
            <TableBody>
                <NewVersionRow versionsNumber={versionsNumber + 1} toggleMode={toggleMode} />
                {
                    versionsInfo && versionsInfo.reverse().map((item, key) => {
                        const status = get(item, 'status', STATUS_INCOMPLETE);
                        const dateCompleted = get(item, 'dateCompleted', '-');
                        const timeCompleted = get(item, 'timeCompleted', '-');
                        const rowClassName = this.getRowClassName(status, item);
                        const version = versionsNumber--;
                        return (
                            <TableRow className={(currentVersion === version) ? classes.currentRow : classes[rowClassName]} key={key} onClick={() => showVersion(version)}>
                                <TableCell scope="row" padding="none">
                                    <span>{version}</span>
                                </TableCell>
                                <TableCell scope="row" padding="none">
                                    <span>{dateCompleted}</span>
                                </TableCell>
                                <TableCell scope="row" padding="none">
                                    <span>{timeCompleted}</span>
                                </TableCell>
                                <TableCell align="right">
                                    <span>{status}</span>
                                </TableCell>
                                <TableCell align="right">
                                    <span>{get(item, 'author', STATUS_INCOMPLETE)}</span>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        );
    }
};

export default withStyles(styles)(TableBodyBlock);
