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
                borderLeft: theme.isOldDesign ? `0.5px solid ${theme.palette.borderColor}` : null,
                borderRight: theme.isOldDesign ? `0.5px solid ${theme.palette.borderColor}` : null,
            },
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.secondaryMainColor + '!important',
            '& td div button': {
                backgroundColor: theme.palette.paperColor,
                color: theme.palette.secondaryMainColor
            },
            '& td div svg': {
                backgroundColor: theme.palette.paperColor,
                color: theme.palette.secondaryMainColor
            },
        },
        '& tbody tr td': {
            borderLeft: theme.isOldDesign ? `0.5px solid ${theme.palette.borderColor}` : null,
            borderRight: theme.isOldDesign ? `0.5px solid ${theme.palette.borderColor}` : null,
        },
        '& tbody tr:hover td span': {
            color: theme.palette.paperColor
        },

    },
    rowEven: {
        backgroundColor: theme.isOldDesign ? theme.palette.toolbarColor : theme.palette.paperColor
    },
    rowOdd: {
        backgroundColor: theme.palette.paperColor
    }
});

const CustomDatagridBody = ({ CustomRow, location, hiddenColumns, history, ...rest }) => <DatagridBody {...rest} row={<CustomRow location={location} hiddenColumns={hiddenColumns} history={history} rowClick="edit" />} />
const CustomDatagrid = ({ classes, history, CustomRow, CustomTableHead, hiddenColumns, location, ...rest }) => <Datagrid {...rest} rowClick="edit" body={<CustomDatagridBody location={location} hiddenColumns={hiddenColumns} history={history} CustomRow={CustomRow} />} />;

const DatagridBlock = ({ classes, location, hiddenColumns, isCustomDatagrid, children, history, CustomRow, CustomTableHead, ...rest }) => {
    if (isCustomDatagrid) {
        return (
            <CustomDatagrid className={classes.tableList} hiddenColumns={hiddenColumns} location={location} CustomRow={CustomRow} CustomTableHead={CustomTableHead} history={history} rowClick="edit" {...rest}>
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

function getSearch(userSearch, userSearchID) {
    let result = null
    if (userSearch) {
        result = userSearch;
    }
    if (userSearchID) {
        result = userSearchID;
    }
    return result;
}

function getSearchType(userSearch, userSearchID) {
    let result = null
    if (userSearch) {
        result = 'name';
    }
    if (userSearchID) {
        result = 'id';
    }
    return result;
}

const TableContent = props => {
    const { classes, title, idsNumber, resourceUrl, key, userSearch, userSearchID, filterText, history, isCreatePage, createUrl, children, defaultSort } = props;
    const sortField = defaultSort ? defaultSort : 'dateCreated';
    const search = getSearch(userSearch, userSearchID);
    const searchType = getSearchType(userSearch, userSearchID);
    return (
        <List
            resource={resourceUrl}
            key={key}
            sort={{ field: sortField, order: 'DESC' }}
            filter={{
                filterText: (search && resourceUrl === 'patients') ? search : filterText,
                filterType: searchType,
            }}
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

