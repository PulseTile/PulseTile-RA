import React from "react";
import { List, Datagrid } from "react-admin";

import { withStyles } from "@material-ui/core/styles";

import EmptyListBlock from "../EmptyListBlock";
import {ITEMS_PER_PAGE} from "../../../config/styles";
import ListToolbar from "../../Toolbars/ListToolbar";

const styles = theme => ({
    tableList: {
        '& thead': {
            '& tr th': {
                paddingLeft: 10,
            },
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.mainColor + '!important',
        },
        '& tbody tr:hover td span': {
            color: "#fff"
        },
        '& tbody tr:hover td button span p': {
            color: "#fff"
        }
    }
});

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
                <Datagrid className={classes.tableList} rowClick="edit">
                    {children}
                </Datagrid>
                :
                <EmptyListBlock />
            }
        </List>
    );
};

export default withStyles(styles)(TableContent);

