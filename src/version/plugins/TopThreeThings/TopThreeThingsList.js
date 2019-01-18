import React from "react";
import { Route } from "react-router";
import {
    List,
    Datagrid,
    TextField,
    DateField
} from "react-admin";

import { withStyles } from "@material-ui/core/styles";

import TableHeader from "../../../core/common/TableHeader";
import TopThreeThingsEdit from "./TopThreeThingsEdit";

const listStyles = {
    list: {
        width: '100%',
    },
    edit: {
        width: '100%',
    },
};

/**
 * This component returns block with TopThreeThings list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
export const TopThreeThingsList = ({ classes, ...rest }) => (
    <div>
        <TableHeader resourse="top3Things" />
        <div style={{ display: "flex" }}>
            <List title="Vaccinations" className={classes.list} {...rest}>
                <Datagrid rowClick="edit">
                    <DateField source="dateCreated" />
                    <TextField source="name1" label="Issue #1" />
                    <TextField source="name2" label="Issue #2" />
                    <TextField source="name3" label="Issue #3" />
                    <TextField source="source" label="Source" />
                </Datagrid>
            </List>
            <Route
                path="/top3Things/:id"
                render={({ match }) => <TopThreeThingsEdit {...rest} classes={classes} id={match.params.id} />}
            />
        </div>
    </div>
);

export default withStyles(listStyles)(TopThreeThingsList);
