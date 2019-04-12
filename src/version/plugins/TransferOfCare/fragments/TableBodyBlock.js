import React, { Component } from "react";
import { Route } from "react-router";

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

class TableBodyBlock extends Component {

    render() {
        const { list } = this.props;
        return (
            <TableBody>
                {
                    list.map((item, key) => {
                        return (
                            <TableRow key={key}>
                                <TableCell scope="row" padding="none">
                                    <Typography>{item.name}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography>{item.type}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography>{item.date}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography>{item.source}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    removeButton
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