import React from "react";

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const TableBodyBlock = ({ data, rowsPerPage, page, onRowClick }) => {
    return (
        <TableBody>
            {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => {
                    return (
                        <TableRow onClick={() => onRowClick(item.id)}>
                            <TableCell scope="row" padding="none">
                                <span>{item.name}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span>{item.address}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span>{item.dateOfBirth}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span>{item.gender}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span>{item.nhsNumber}</span>
                            </TableCell>
                        </TableRow>
                    );
                }
            )}
        </TableBody>
    );
}


export default TableBodyBlock;