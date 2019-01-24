import React from "react";
import { Pagination } from 'react-admin';

import { withStyles } from "@material-ui/core/styles";

import CreateButton from "../common/Buttons/CreateButton";

const styles = {
    paginationBlock: {
        display: "flex",
        flexDirection: "row",
    }
};

/**
 * This component returns toolbar for List
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   classes
 * @param {boolean} isCreatePage
 * @param {string}  createPath
 * @param {shape}   history
 * @param {shape}   rest
 */
const ListToolbar = ({ classes, isCreatePage, createPath, history, ...rest }) => (
    <div className={classes.paginationBlock}>
        <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...rest} />
        {
            !isCreatePage &&
                <CreateButton history={history} createPath={createPath} />
        }
    </div>
);

export default withStyles(styles)(ListToolbar);
