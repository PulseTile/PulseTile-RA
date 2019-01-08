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
import DiagnosisBanner from "../../images/banners/problems.jpg";

export const Diagnosis = props => {
    return (
        <div>
            <Card>
                <CardMedia
                    component="img"
                    height="160"
                    image={DiagnosisBanner}
                    title="Diagnosis"
                />
            </Card>
            <List title="Diagnosis" {...props}>
                <Datagrid>
                    <TextField source="problem" />
                    <DateField source="dateOfOnset" />
                    <TextField source="source" />
                    <ShowButton />
                    <EditButton />
                </Datagrid>
            </List>
        </div>
    );
};

export default Diagnosis;
