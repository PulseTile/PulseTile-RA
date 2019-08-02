import React, { Component } from "react";
import get from "lodash/get";
import {Datagrid, DatagridRow} from 'react-admin';

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

    getCurrentPage = () => {
        const { location } = this.props;
        let result = 1;
        const search = get(location, 'search', null);
        if (search) {
            const params = new URLSearchParams(search);
            result = params.get('page');
        }
        return result;
    };

    getUrl = () => {
        const { id, basePath } = this.props;
        const currentPage = this.getCurrentPage();
        return (currentPage > 1) ? (basePath + '/' + id + '?page=' + currentPage + '&perPage=10')  : (basePath + '/' + id);
    };

    render() {
        const { classes, record, history, children } = this.props;
        if (!record) {
            return null;
        }
        const detailsPath = this.getUrl();
        const isActiveRow = this.isActiveRow();
        return (
            <TableRow className={isActiveRow ? classes.tableRowActive : classes.tableRow} key={record.id} onClick={() => history.push(detailsPath)}>
                {children}
            </TableRow>
        );
    }
};

export default withStyles(styles)(CustomDatagridRow);
