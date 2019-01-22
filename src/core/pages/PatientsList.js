import React from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    ShowButton
} from "react-admin";

/**
 * This function redirects user to PatientSummary and update userID
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {number} id
 * @param {shape}  history
 */
function redirectToSummary(id, history) {
    localStorage.setItem('userId', id);
    history.push('/summary');
}

export const PatientsList = ({ history, ...rest }) => (
    <List title="Patients" {...rest}>
        <Datagrid rowClick={(id, basePath, record) => redirectToSummary(id, history)}>
            <TextField source="name" />
            <TextField source="address" />
            <DateField source="dateOfBirth" />
            <ShowButton />
        </Datagrid>
    </List>
);

export default PatientsList;