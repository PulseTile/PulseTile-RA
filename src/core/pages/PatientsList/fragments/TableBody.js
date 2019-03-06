import React from "react";
import moment from "moment";

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const TableBodyBlock = ({ data, rowsPerPage, page, onRowClick }) => {
    const dataForPage = data.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
    return (
        <TableBody>
            {dataForPage.map(item => {
                    return (
                        <TableRow onClick={() => onRowClick(item.id)}>
                            <TableCell scope="row" padding="none">
                                <span>{item.name}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span>{item.address}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span>{moment(item.dateOfBirth).format('DD-MMM-YYYY')}</span>
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