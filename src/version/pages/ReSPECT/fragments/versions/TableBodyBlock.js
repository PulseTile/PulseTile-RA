import React, { Component } from "react";
import get from "lodash/get";
import { Route } from "react-router";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { STATUS_INCOMPLETE, STATUS_COMPLETED, DATE_FORMAT, TIME_FORMAT } from "../../statuses";

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
        backgroundColor: theme.palette.secondaryMainColor,
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
        const { classes, currentVersion, showVersion, versionsInfo } = this.props;
        return (
            <React.Fragment>
                <TableBody>
                    {
                        versionsInfo && versionsInfo.map((item, key) => {
                            const status = get(item, 'status', STATUS_INCOMPLETE);
                            const dateCreated = get(item, 'dateCreated', '-');
                            const date = moment(dateCreated).format(DATE_FORMAT);
                            const time = moment(dateCreated).format(TIME_FORMAT);
                            const author = get(item, 'author', null);
                            const rowClassName = this.getRowClassName(status, item);
                            const version = get(item, 'version', null);
                            const sourceId = get(item, 'sourceId', null);
                            return (
                                <TableRow className={(currentVersion === version) ? classes.currentRow : classes[rowClassName]} key={key} onClick={() => showVersion(version, sourceId)}>
                                    <TableCell scope="row" padding="none">
                                        <span>{version}</span>
                                    </TableCell>
                                    <TableCell scope="row" padding="none">
                                        <span>{date}</span>
                                    </TableCell>
                                    <TableCell scope="row" padding="none">
                                        <span>{time}</span>
                                    </TableCell>
                                    {/*<TableCell align="right">*/}
                                        {/*<span>{status}</span>*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="right">
                                        <span>{(version === 1) ? 'System' : author}</span>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(TableBodyBlock);
