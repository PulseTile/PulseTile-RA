import React from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    ShowButton
} from "react-admin";

export const PatientsList = props => {
    return (
        <List title="Patients" {...props}>
            <Datagrid>
                <TextField source="name" />
                <TextField source="address" />
                <DateField source="dateOfBirth" />
                <ShowButton />
            </Datagrid>
        </List>
    );
};

export default PatientsList;