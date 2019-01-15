import React from "react";
import { Route } from "react-router";
import {
    List,
    Datagrid,
    TextField,
    DateField
} from "react-admin";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

import VaccinationsBanner from "../../images/banners/vaccinations.jpg";
import VaccinationsEdit from "./VaccinationsEdit";

const listStyles = {
    list: {
        width: '100%',
    },
    edit: {
        width: '100%',
    }
};

/**
 * This component returns block with Vaccinations list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
export const Vaccinations = props => {
    const { classes } = props;
    return (
        <div>
            <Card>
                <CardMedia
                    component="img"
                    height="160"
                    image={VaccinationsBanner}
                    title="Vaccinations"
                />
            </Card>
            <div style={{ display: "flex" }}>
                <List title="Vaccinations" className={classes.list} {...props}>
                    <Datagrid rowClick="edit">
                        <TextField source="vaccinationName" />
                        <DateField source="dateCreated" />
                        <TextField source="source" />
                    </Datagrid>
                </List>
                <Route
                    path="/vaccinations/:id"
                    render={({ match }) => <VaccinationsEdit {...props} id={match.params.id} />}
                />
            </div>
        </div>
    );
};

export default withStyles(listStyles)(Vaccinations);
