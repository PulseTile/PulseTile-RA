import React from "react";
import {List, Datagrid, DatagridBody} from "react-admin";

import { withStyles } from "@material-ui/core/styles";

import EmptyListBlock from "../EmptyListBlock";
import {ITEMS_PER_PAGE} from "../../../config/styles";
import ListToolbar from "../../Toolbars/ListToolbar";

const styles = theme => ({
    tableList: {
        '& thead': {
            '& tr th': {
                backgroundColor: theme.palette.tableHeadColor + '!important',
                paddingLeft: 10,
                borderLeft: theme.isShowcase ? `0.5px solid ${theme.palette.borderColor}` : null,
                borderRight: theme.isShowcase ? `0.5px solid ${theme.palette.borderColor}` : null,
            },
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.secondaryMainColor + '!important',
        },
        '& tbody tr td': {
            borderLeft: theme.isShowcase ? `0.5px solid ${theme.palette.borderColor}` : null,
            borderRight: theme.isShowcase ? `0.5px solid ${theme.palette.borderColor}` : null,
        },
        '& tbody tr:hover td span': {
            color: theme.palette.paperColor
        },
        '& tbody tr:hover td button span p': {
            color: theme.palette.paperColor
        }
    },
    rowEven: {
        backgroundColor: theme.isShowcase ? theme.palette.toolbarColor : theme.palette.paperColor
    },
    rowOdd: {
        backgroundColor: theme.palette.paperColor
    }
});

const CustomDatagridBody = ({ CustomRow, history, ...rest }) => <DatagridBody {...rest} row={<CustomRow history={history} rowClick="edit" />} />
const CustomDatagrid = ({ classes, history, CustomRow, CustomTableHead, ...rest }) => <Datagrid {...rest} rowClick="edit" body={<CustomDatagridBody history={history} CustomRow={CustomRow} />} />;


const DatagridBlock = ({ classes, isCustomDatagrid, children, history, CustomRow, CustomTableHead, ...rest }) => {
    if (isCustomDatagrid) {
        return (
            <CustomDatagrid className={classes.tableList} CustomRow={CustomRow} CustomTableHead={CustomTableHead} history={history} rowClick="edit" {...rest}>
                {children}
            </CustomDatagrid>
        );
    }
    return (
        <Datagrid className={classes.tableList} classes={{ rowEven: classes.rowEven, rowOdd: classes.rowOdd  }} rowClick="edit" {...rest}>
            {children}
        </Datagrid>
    );
};


const TableContent = props => {
    const { classes, title, idsNumber, resourceUrl, key, userSearch, filterText, history, isCreatePage, createUrl, children } = props;
    return (
        <List
            resource={resourceUrl}
            key={key}
            filter={{ filterText: (userSearch && resourceUrl === 'patients') ? userSearch : filterText }}
            title={title}
            perPage={ITEMS_PER_PAGE}
            actions={null}
            bulkActions={false}
            pagination={<ListToolbar resourceUrl={resourceUrl} history={history} isCreatePage={isCreatePage} createPath={createUrl} />}
            {...props}
        >
            { (idsNumber > 0) ?
                <DatagridBlock classes={classes} children={children} history={history} {...props} />
                :
                <EmptyListBlock />
            }
        </List>
    );
};

export default withStyles(styles)(TableContent);

