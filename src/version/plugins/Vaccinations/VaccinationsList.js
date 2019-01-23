import React from "react";
import { Route } from "react-router";
import {
    List,
    Datagrid,
    TextField,
    DateField
} from "react-admin";

import { withStyles } from "@material-ui/core/styles";

import Breadcrumbs from "../../../core/common/Breadcrumbs";
import VaccinationsEdit from "./VaccinationsEdit";
import TableHeader from "../../../core/common/TableHeader";

const listStyles = {
    list: {
        width: '100%',
    },
    edit: {
        width: '100%',
    }
};

const breadcrumbsResource = [
    { url: "/vaccinations", title: "Vaccinations", isActive: false },
];

/**
 * This component returns block with Vaccinations list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
export const Vaccinations = ({ classes, ...rest }) => (
    <div>
        <Breadcrumbs resource={breadcrumbsResource} />
        <TableHeader resource="vaccinations" />
        <div style={{ display: "flex" }}>
            <List title="Vaccinations" className={classes.list} {...rest}>
                <Datagrid rowClick="edit">
                    <TextField source="vaccinationName" />
                    <DateField source="dateCreated" />
                    <TextField source="source" />
                </Datagrid>
            </List>
            <Route
                path="/vaccinations/:id"
                render={({ match }) => <VaccinationsEdit {...rest} classes={classes} id={match.params.id} />}
            />
        </div>
    </div>
);

export default withStyles(listStyles)(Vaccinations);
