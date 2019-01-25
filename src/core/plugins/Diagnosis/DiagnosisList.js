import React from "react";
import { Route } from "react-router";
import {
    List,
    Datagrid,
    DateField,
    TextField
} from "react-admin";

import { withStyles } from "@material-ui/core/styles";

import Breadcrumbs from "../../common/Breadcrumbs";
import TableHeader from "../../common/TableHeader";
import DiagnosisEdit from "./DiagnosisEdit";

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
    { url: "/problems", title: "Problems / Issues", isActive: false },
];

/**
 * This component returns block with Diagnosis list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
export const Diagnosis = ({ classes, ...rest }) => (
    <React.Fragment>
        <Breadcrumbs resource={breadcrumbsResource} />
        <TableHeader resource="problems" />
        <div className={classes.mainBlock}>
            <List title="Problems / Issues" className={classes.list} {...rest}>
                <Datagrid rowClick="edit">
                    <TextField source="problem" />
                    <DateField source="dateOfOnset" />
                    <TextField source="source" />
                </Datagrid>
            </List>
            <Route
                path="/problems/:id"
                render={({ match }) => <DiagnosisEdit {...rest} classes={classes} id={match.params.id} />}
            />
        </div>
    </React.Fragment>
);

export default withStyles(listStyles)(Diagnosis);
