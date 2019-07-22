import React from "react";
import {List, Datagrid, DatagridBody} from "react-admin";

import { withStyles } from "@material-ui/core/styles";

import EmptyListBlock from "../EmptyListBlock";
import {ITEMS_PER_PAGE} from "../../../config/styles";
import ListToolbar from "../../Toolbars/ListToolbar";

const styles = theme => ({
    tableList: {
        whiteSpace: "nowrap",
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
    tableWrapper: {
        overflowX: 'auto',
    },
    rowEven: {
        backgroundColor: theme.isOldDesign ? theme.palette.toolbarColor : theme.palette.paperColor
    },
    rowOdd: {
        backgroundColor: theme.palette.paperColor
    }
});

const CustomDatagridBody = ({ CustomRow, location, hiddenColumns, history, ...rest }) => {
    return (
        <DatagridBody
            row={<CustomRow
                location={location}
                hiddenColumns={hiddenColumns}
                history={history}
            />}
            {...rest}
        />
    );
};


const CustomDatagrid = ({ classes, history, CustomRow, CustomTableHead, hiddenColumns, location, ...rest }) => {
    return (
        <Datagrid
            body={
                <CustomDatagridBody
                    location={location}
                    hiddenColumns={hiddenColumns}
                    history={history}
                    CustomRow={CustomRow}
                />}
            {...rest}
        />
    );
};

const DatagridBlock = ({ classes, location, hiddenColumns, isCustomDatagrid, children, history, CustomRow, CustomTableHead, ...rest }) => {
    if (isCustomDatagrid) {
        return (
            <div className={classes.tableWrapper}>
                <CustomDatagrid
                    className={classes.tableList}
                    hiddenColumns={hiddenColumns}
                    location={location}
                    CustomRow={CustomRow}
                    CustomTableHead={CustomTableHead}
                    history={history}
                    {...rest}
                >
                    {children}
                </CustomDatagrid>
            </div>
        );
    }
    return (
        <div className={classes.tableWrapper}>
            <Datagrid
                className={classes.tableList}
                classes={{ rowEven: classes.rowEven, rowOdd: classes.rowOdd  }}
                {...rest}
            >
                {children}
            </Datagrid>
        </div>
    );
};

function getSearch(userSearch, userSearchID) {
    let result = null;
    if (userSearch) {
        result = userSearch;
    }
    if (userSearchID) {
        result = userSearchID;
    }
    return result;
}

function getSearchType(userSearch, userSearchID, userSearchType, userClinicalQuery) {
    let result = null;
    if (userSearch) {
        result = 'name';
    }
    if (userSearchID) {
        result = 'id';
    }
    if (userSearchType) {
        result = userSearchType;
    }
    if (userClinicalQuery) {
        result = 'clinicalQuery'
    }
    return result;
}

const TableContent = props => {
    const { classes, title, idsNumber, isDetailsPage, resourceUrl, notCreate, key, userSearch, userSearchID, userSearchType, userClinicalQuery, filterText, history, isCreatePage, createUrl, children, defaultSort, defaultSortOrder } = props;
    const sortField = defaultSort ? defaultSort : 'dateCreated';
    const sortOrder = defaultSortOrder ? defaultSortOrder : 'DESC';
    const search = getSearch(userSearch, userSearchID);
    const searchType = getSearchType(userSearch, userSearchID, userSearchType, userClinicalQuery);
    return (
        <List
            resource={resourceUrl}
            key={key}
            sort={{ field: sortField, order: sortOrder }}
            filter={{
                filterText: (search && resourceUrl === 'patients') ? search : filterText,
                filterType: searchType,
                clinicalQuery: userClinicalQuery,
            }}
            title={title}
            perPage={ITEMS_PER_PAGE}
            actions={null}
            bulkActions={false}
            pagination={<ListToolbar notCreate={notCreate} resourceUrl={resourceUrl} history={history} isCreatePage={isCreatePage} createPath={createUrl} />}
            {...props}
        >
            { (idsNumber === 0 && !isDetailsPage) ?
                <EmptyListBlock />
                :
                <DatagridBlock classes={classes} children={children} history={history} {...props} />
            }
        </List>
    );
};

export default withStyles(styles)(TableContent);

