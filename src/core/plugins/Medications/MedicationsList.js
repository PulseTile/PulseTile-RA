import React from "react";
import {
    List,
    Datagrid,
    DateField,
    TextField,
    EditButton,
    ShowButton
} from "react-admin";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import MedicationsBanner from "../../images/banners/medications.jpg";

export const Medications = props => {
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
            <List title="Medications" {...props}>
                <Datagrid>
                    <TextField source="name" />
                    <TextField source="doseAmount" />
                    <DateField source="dateOfOnset" />
                    <TextField source="source" />
                    <ShowButton />
                    <EditButton />
                </Datagrid>
            </List>
        </div>
    );
};

export default Medications;
