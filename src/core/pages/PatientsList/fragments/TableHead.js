import React, { Component } from "react";

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const rows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'dateOfBirth', numeric: false, disablePadding: false, label: 'Born' },
    { id: 'gender', numeric: false, disablePadding: false, label: 'Gender' },
    { id: 'nhsNumber', numeric: true, disablePadding: false, label: 'NHS No.' },
];

class TableHeader extends Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip title="Sort" placement={row.numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
                                    <TableSortLabel active={orderBy === row.id} direction={order} onClick={this.createSortHandler(row.id)}>
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),this)
                    }
                </TableRow>
            </TableHead>
        );
    }
};

export default TableHeader;