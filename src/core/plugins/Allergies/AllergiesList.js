import React from "react";
import { Route } from "react-router";
import {
  List,
  Datagrid,
  TextField
} from "react-admin";

import { withStyles } from "@material-ui/core/styles";

import Breadcrumbs from "../../common/Breadcrumbs";
import TableHeader from "../../common/TableHeader";
import AllergiesEdit from "./AllergiesEdit";

const listStyles = {
    list: {
        width: '100%',
    },
    edit: {
        width: '100%',
    },
    mainBlock: {
        display: "flex",
    }
};

const breadcrumbsResource = [
    { url: "/allergies", title: "Allergies", isActive: false },
];

/**
 * This component returns block with Allergies list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
export const Allergies = ({ classes, ...rest }) => (
    <React.Fragment>
        <Breadcrumbs resource={breadcrumbsResource} />
        <TableHeader resource="allergies" />
        <div className={classes.mainBlock}>
            <List title="Allergies" className={classes.list} {...rest}>
                <Datagrid rowClick="edit">
                    <TextField source="cause" />
                    <TextField source="reaction" />
                    <TextField source="source" />
                </Datagrid>
            </List>
            <Route
                path="/allergies/:id"
                render={({ match }) => <AllergiesEdit classes={classes} {...rest} id={match.params.id} />}
            />
        </div>
    </React.Fragment>
);

export default withStyles(listStyles)(Allergies);
