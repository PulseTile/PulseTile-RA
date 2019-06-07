import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";
import { Route } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { STATUS_INCOMPLETE, STATUS_COMPLETED, STATUS_NONE, DATE_FORMAT } from "../../statuses";
import StatusCell from "../StatusCell";

const styles = theme => ({
    rowCompleted: {
        backgroundColor: theme.palette.paperColor,
    },
    rowStatusNone: {
        backgroundColor: theme.palette.paperColor,
    },
    rowInComplete: {
        backgroundColor: "#f1f0f0",
        '& td span': {
            color: "#6d6c6c",
        },
    },
});

class SectionsInfo extends Component {

    getRowClassName = (versionInfo, status, item) => {
        let result = 'rowInComplete';
        if (status === STATUS_COMPLETED) {
            result = 'rowCompleted';
        }
        if (versionInfo && (item.id === 1 || item.id === 10)) {
            result = 'rowStatusNone';
        }
        return result;
    };

    getStatusLabel = (versionInfo, item) => {
        if (Number(item.id) === 1 || Number(item.id) === 10) {
            return STATUS_NONE;
        }
        return get(versionInfo, [ item.name, 'status'], STATUS_INCOMPLETE);
    };

    render() {
        const { classes, sections, versionInfo, toggleMode, currentVersion } = this.props;
        return (
            <TableBody>
                {
                    sections.map((item, key) => {
                        const status = this.getStatusLabel(versionInfo, item);
                        const dateCompleted = get(versionInfo, [ item.name, 'dateCompleted'], null);
                        const dateCompletedConvert = dateCompleted
                            ? moment(dateCompleted).format(DATE_FORMAT)
                            : '-';
                        const rowClassName = this.getRowClassName(versionInfo, status, item);
                        return (
                            <TableRow className={classes[rowClassName]} key={key} onClick={() => toggleMode(currentVersion, item.id)}>
                                <TableCell scope="row" padding="none">
                                    <span>{item.section}</span>
                                </TableCell>
                                <TableCell align="right">
                                    <StatusCell item={item} currentRow={null} status={status} />
                                </TableCell>
                                {/*<TableCell align="right">*/}
                                    {/*<span>{dateCompletedConvert}</span>*/}
                                {/*</TableCell>*/}
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        );
    }
};

export default withStyles(styles)(SectionsInfo);
