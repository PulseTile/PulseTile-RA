import React, { Component } from "react";
import get from "lodash/get";
import { Route } from "react-router";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { STATUS_INCOMPLETE, STATUS_COMPLETED } from "../../statuses";
import StatusCell from "../StatusCell";
import NewVersionRow from "./NewVersionRow";

const styles = {
    rowCompleted: {
        backgroundColor: "#fff",
    },
    rowInComplete: {
        backgroundColor: "#f1f0f0",
        '& td span': {
            color: "#6d6c6c",
        },
    },
    rowInProgress: {
        backgroundColor: "#dbe4ed",
        '& td span': {
            fontWeight: 600,
        },
    },
};

class TableBodyBlock extends Component {

    getRowClassName = (status, item) => {
        let result = 'rowInComplete';
        if (status === STATUS_COMPLETED) {
            result = 'rowCompleted';
        } else if (item.id === this.props.currentRow) {
            result = 'rowInProgress';
        }
        return result;
    };

    render() {
        const { classes, toggleMode, showVersion, currentVersion, versionsInfo } = this.props;
        let versionsNumber = Array.isArray(versionsInfo) ? (versionsInfo.length + 1) : 1;

        return (
            <TableBody>
                <NewVersionRow versionsNumber={versionsNumber} toggleMode={toggleMode} />
                {
                    versionsInfo && versionsInfo.map((item, key) => {

                        const status = get(item, 'status', STATUS_INCOMPLETE);
                        const dateCompleted = get(item, 'dateCompleted', '-');
                        const rowClassName = this.getRowClassName(status, item);
                        versionsNumber--;
                        return (
                            <TableRow className={classes[rowClassName]} key={key} onClick={() => showVersion(item.id)}>
                                <TableCell scope="row" padding="none">
                                    <span>{versionsNumber}</span>
                                </TableCell>
                                <TableCell scope="row" padding="none">
                                    <span>{moment(dateCompleted).format('DD-MMM-YYYY')}</span>
                                </TableCell>
                                <TableCell scope="row" padding="none">
                                    <span>{moment(dateCompleted).format('HH:mm')}</span>
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
