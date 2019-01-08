import React from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    ShowButton
} from "react-admin";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import VaccinationsBanner from "../../images/banners/vaccinations.jpg";

export const Vaccinations = props => {
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
            <List title="Vaccinations" {...props}>
                <Datagrid>
                    <TextField source="vaccinationName" />
                    <DateField source="dateCreated" />
                    <TextField source="source" />
                    <ShowButton />
                    <EditButton />
                </Datagrid>
            </List>
        </div>
    );
};

export default Vaccinations;
