import React from "react";
import { Pagination } from 'react-admin';

import { withStyles } from "@material-ui/core/styles";

import CreateButton from "../../common/Buttons/CreateButton";
import CustomPaginator from "../../common/Buttons/CustomPaginator";

const styles = {
    paginationBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
};

/**
 * This component returns toolbar for List
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   classes
 * @param {boolean} isCreatePage
 * @param {string}  resourceUrl
 * @param {string}  createPath
 * @param {shape}   history
 * @param {shape}   rest
 */
const ListToolbar = ({ classes, isCreatePage, resourceUrl, createPath, history, ...rest }) => (
    <div className={classes.paginationBlock}>
        <CustomPaginator resourceUrl={resourceUrl} history={history} itemsPerPage={10} />
        {
            (!isCreatePage && resourceUrl !== "top3Things") &&
                <CreateButton history={history} redirectPath={createPath} />
        }
    </div>
);

export default withStyles(styles)(ListToolbar);
