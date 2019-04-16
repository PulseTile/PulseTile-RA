import React from "react";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import { DATE_FORMAT } from "../statuses";

const styles = theme => ({
    tableList: {
        '& thead': {
            backgroundColor: "#e5e5e5",
            '& tr th span span': {
                color: "#000",
            },
            '& tr th': {
                paddingLeft: 10,
            },
            '& tr': {
                height: 48,
            },
        },
        '& tbody tr td': {
            paddingLeft: 10,
        },
    },
});

const TableOfContacts = ({ classes, headers, rowsArray }) => {
    return (
        <Table className={classes.tableList} aria-labelledby="tableTitle">
            <TableHead>
                <TableRow>
                    {headers.map((item, key) => {
                        return (
                            <TableCell key={key} align={item.numeric ? 'right' : 'left'} padding={item.disablePadding ? 'none' : 'default'}>
                                {item.label}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {rowsArray.map((rowItem, key) => {
                    return (
                        <TableRow key={key}>

                            {headers.map((headerItem, key) => {
                                let label = rowItem[headerItem.id];
                                if (headerItem.isDate) {
                                    label = moment(label).format(DATE_FORMAT);
                                } else if (headerItem.isBinary) {
                                    label = rowItem[headerItem.id] ? 'Yes' : 'No';
                                }
                                return (
                                    <TableCell key={key} align={headerItem.numeric ? 'right' : 'left'} padding={headerItem.disablePadding ? 'none' : 'default'}>
                                        {label}
                                    </TableCell>
                                );
                            })}


                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default withStyles(styles)(TableOfContacts);
