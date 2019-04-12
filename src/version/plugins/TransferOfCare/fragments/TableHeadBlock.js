import React, { Component } from "react";

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const rows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'source', numeric: false, disablePadding: false, label: 'Source' },
];

class TableHeadBlock extends Component {
    render() {
        return (
            <TableHead>
                <TableRow>
                    {
                        rows.map(row => (
                            <TableCell key={row.id} align={row.numeric ? 'right' : 'left'} padding={row.disablePadding ? 'none' : 'default'}>
                                {row.label}
                            </TableCell>
                        ),this)
                    }
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
        );
    }
};

export default TableHeadBlock;