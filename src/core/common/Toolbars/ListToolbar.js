import React from "react";
import { Pagination } from 'react-admin';

import { withStyles } from "@material-ui/core/styles";

import CreateButton from "../../common/Buttons/CreateButton";
import CustomPaginator from "../../common/Buttons/CustomPaginator";

const styles = {
    paginationBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 45,
    },
};

/**
 * This function returns false if current resource is TopThreeThings and current patient has more than zero items
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {string} resourceUrl
 * @param {number} total
 * @return {boolean}
 */
function checkForTopThreeThings(resourceUrl, total) {
    return !(resourceUrl === "top3Things" && total > 0);
}

/**
 * This component returns toolbar for List
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   classes
 * @param {boolean} isCreatePage
 * @param {string}  resourceUrl
 * @param {string}  createPath
 * @param {shape}   history
 * @param {number}  total
 */
const ListToolbar = ({ classes, isCreatePage, resourceUrl, createPath, history, total }) => (
    <div className={classes.paginationBlock}>
        <CustomPaginator resourceUrl={resourceUrl} history={history} itemsPerPage={10} total={total} />
        {
            (!isCreatePage && checkForTopThreeThings(resourceUrl, total)) &&
                <CreateButton history={history} redirectPath={createPath} />
        }
    </div>
);

export default withStyles(styles)(ListToolbar);
