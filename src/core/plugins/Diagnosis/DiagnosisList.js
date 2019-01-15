import React from "react";
import { Route } from "react-router";
import {
    List,
    Datagrid,
    DateField,
    TextField
} from "react-admin";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

import DiagnosisBanner from "../../images/banners/problems.jpg";
import DiagnosisEdit from "./DiagnosisEdit";

const listStyles = {
    list: {
        width: '100%',
    },
    edit: {
        width: '100%',
    }
};

/**
 * This component returns block with Diagnosis list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
export const Diagnosis = ({ classes, ...rest }) => (
    <div>
        <Card>
            <CardMedia
                component="img"
                height="160"
                image={DiagnosisBanner}
                title="Problems / Issues"
            />
        </Card>
        <div style={{ display: "flex" }}>
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
    </div>
);

export default withStyles(listStyles)(Diagnosis);
