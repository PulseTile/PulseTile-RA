import React, { Component } from "react";
import get from "lodash/get";

import { Route } from "react-router";

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { STATUS_INCOMPLETE, STATUS_IN_PROGRESS, STATUS_COMPLETED } from "../statuses";
import StatusCell from "./StatusCell";

class TableBodyBlock extends Component {

    render() {
        const { sections, onRowClick, currentRow, statuses, sectionsInfo } = this.props;
        return (
            <TableBody>
                {
                    sections.map((item, key) => {
                        const status = get(sectionsInfo, [ item.name, 'status'], STATUS_INCOMPLETE);
                        const dateCompleted = get(sectionsInfo, [ item.name, 'dateCompleted'], '-');
                        return (
                            <TableRow key={key} onClick={() => onRowClick(item.id)}>
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

export default TableBodyBlock;
