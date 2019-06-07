import React, { Component } from "react";

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const rows = [
    { id: 'version', numeric: false, disablePadding: false, label: 'Version' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
    // { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'author', numeric: false, disablePadding: false, label: 'Author' },
];

class TableHeadBlock extends Component {
    render() {
        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => (
                        <TableCell
                            key={row.id}
                            align={row.numeric ? 'right' : 'left'}
                            padding={row.disablePadding ? 'none' : 'default'}
                        >
                            {row.label}
                        </TableCell>
                    ),this)
                    }
                </TableRow>
            </TableHead>
        );
    }
};

export default TableHeadBlock;