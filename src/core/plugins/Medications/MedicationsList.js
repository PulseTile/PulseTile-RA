import React from "react";
import { Route } from "react-router";
import {
    List,
    Datagrid,
    DateField,
    TextField
} from "react-admin";

import { withStyles } from "@material-ui/core/styles";

import TableHeader from "../../common/TableHeader";
import MedicationsEdit from "./MedicationsEdit";

const listStyles = {
    list: {
        width: '100%',
    },
    edit: {
        width: '100%',
    },
};

/**
 * This component returns block with Medications list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
export const Medications = ({ classes, ...rest }) => (
    <div>
        <TableHeader resourse="medications" />
        <div style={{ display: "flex" }}>
            <List title="Medications" className={classes.list} {...rest}>
                <Datagrid rowClick="edit">
                    <TextField source="name" />
                    <TextField source="doseAmount" />
                    <DateField source="dateOfOnset" />
                    <TextField source="source" />
                </Datagrid>
            </List>
            <Route
                path="/medications/:id"
                render={({ match }) => <MedicationsEdit {...rest} classes={classes} id={match.params.id} />}
            />
        </div>
    </div>
);

export default withStyles(listStyles)(Medications);
