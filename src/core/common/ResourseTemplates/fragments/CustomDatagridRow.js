import React, { Component } from "react";
import get from "lodash/get";

import { withStyles } from "@material-ui/core/styles";
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    tableRow: {
        '&:hover': {
            backgroundColor: theme.palette.secondaryMainColor + '!important',
            cursor: "pointer"
        },
        '&:hover td': {
            color: theme.palette.paperColor,
        },
    },
    tableRowActive: {
        backgroundColor: theme.palette.secondaryMainColor + '!important',
        '& td': {
            color: theme.palette.paperColor,
        }
    },
});

class CustomDatagridRow extends Component {

    isActiveRow = () => {
        const { id, location } = this.props;
        const pathname = get(location, 'pathname', null);
        const pathnameArray = pathname ? pathname.split('/') : [];
        const sourceId = get(pathnameArray, [2], null);
        return id === sourceId;
    };

    render() {
        const { classes, record, id, history, basePath, children } = this.props;
        if (!record) {
            return null;
        }
        const detailsPath = basePath + '/' + id;
        const isActiveRow = this.isActiveRow();
        return (
            <TableRow className={isActiveRow ? classes.tableRowActive : classes.tableRow} key={record.id} onClick={() => history.push(detailsPath)}>
                {children}
            </TableRow>
        );
    }
};

export default withStyles(styles)(CustomDatagridRow);
