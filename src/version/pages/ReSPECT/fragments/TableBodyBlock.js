import React, { Component } from "react";
import get from "lodash/get";
import { Route } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { STATUS_INCOMPLETE, STATUS_COMPLETED } from "../statuses";
import StatusCell from "./StatusCell";

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
        const { classes, sections, onRowClick, currentRow, sectionsInfo } = this.props;
        return (
            <TableBody>
                {
                    sections.map((item, key) => {
                        const status = get(sectionsInfo, [ item.name, 'status'], STATUS_INCOMPLETE);
                        const dateCompleted = get(sectionsInfo, [ item.name, 'dateCompleted'], '-');
                        const rowClassName = this.getRowClassName(status, item);
                        return (
                            <TableRow className={classes[rowClassName]} key={key} onClick={() => onRowClick(item.id)}>
                                <TableCell scope="row" padding="none">
                                    <span>{item.section}</span>
                                </TableCell>
                                <TableCell align="right">
                                     <StatusCell item={item} currentRow={currentRow} status={status} />
                                </TableCell>
                                <TableCell align="right">
                                    <span>{dateCompleted}</span>
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
