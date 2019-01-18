import React from "react";
import { Route } from "react-router";
import {
    List,
    Datagrid,
    TextField,
    DateField,
} from "react-admin";

import { withStyles } from "@material-ui/core/styles";

import ContactsEdit from "./ContactsEdit";
import TableHeader from "../../common/TableHeader";

const listStyles = {
    list: {
        width: '100%',
    },
    edit: {
        width: '100%',
    }
};

/**
 * This component returns block with Contacts list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
export const ContactsList = ({ classes, ...rest }) => (
    <div>
        <TableHeader resourse="contacts" />
        <div style={{ display: "flex" }}>
            <List title="Contacts" className={classes.list} {...rest}>
                <Datagrid rowClick="edit">
                    <TextField source="name" />
                    <TextField source="relationship" />
                    <TextField source="nextOfKin" />
                    <TextField source="source" />
                </Datagrid>
            </List>
            <Route
                path="/contacts/:id"
                render={({ match }) => <ContactsEdit classes={classes} {...rest} id={match.params.id} />}
            />
        </div>
    </div>
);

export default withStyles(listStyles)(ContactsList);
