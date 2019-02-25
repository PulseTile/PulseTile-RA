import React, { Component } from "react";
import { Route } from "react-router";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = {
    tableCellInpogress: {
        color: '#7bb0e5',
        fontSize: 14,
    }
};

class TableBodyBlock extends Component {

    render() {
        const { classes, sections, onRowClick, currentRow } = this.props;
        return (
            <TableBody>
                {
                    sections.map((item, key) => {
                        return (
                            <TableRow key={key} onClick={() => onRowClick(item.id)}>
                                <TableCell scope="row" padding="none">
                                    <span>{item.section}</span>
                                </TableCell>
                                <TableCell align="right">
                                    <span className={(item.id === currentRow) ? classes.tableCellInpogress : null}>
                                        {(item.id === currentRow) ? 'In progress' : item.status}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span>{item.date ? moment(item.date).format('DD-MMM-YYYY') : '-'}</span>
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
