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

import MedicationsBanner from "../../images/banners/medications.jpg";
import MedicationsEdit from "./MedicationsEdit";

const listStyles = {
    list: {
        width: '100%',
    },
};

/**
 * This component returns block with Medications list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
export const Medications = props => {
    const { classes } = props;
    return (
        <div>
            <Card>
                <CardMedia
                    component="img"
                    height="160"
                    image={MedicationsBanner}
                    title="Medications"
                />
            </Card>
            <div style={{ display: "flex" }}>
                <List title="Medications" className={classes.list} {...props}>
                    <Datagrid rowClick="edit">
                        <TextField source="name" />
                        <TextField source="doseAmount" />
                        <DateField source="dateOfOnset" />
                        <TextField source="source" />
                    </Datagrid>
                </List>
                <Route
                    path="/medications/:id"
                    render={({ match }) => <MedicationsEdit {...props} id={match.params.id} />}
                />
            </div>
        </div>
    );
};

export default withStyles(listStyles)(Medications);
