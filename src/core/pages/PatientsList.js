import React from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    ShowButton
} from "react-admin";

import Breadcrumbs from "../common/Breadcrumbs";

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

/**
 * This component returns block with Patients list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} history
 * @param {shape} rest
 * @constructor
 */
export const PatientsList = ({ history, ...rest }) => {
    const breadcrumbsResource = [
        { url: "/patients", title: "Patients list", isActive: false }
    ];
    return (
        <React.Fragment>
            <Breadcrumbs resource={breadcrumbsResource} />
            <List title="Patients" {...rest}>
                <Datagrid rowClick={(id, basePath, record) => redirectToSummary(id, history)}>
                    <TextField source="name" />
                    <TextField source="address" />
                    <DateField source="dateOfBirth" />
                    <ShowButton />
                </Datagrid>
            </List>
        </React.Fragment>
    );
}

export default PatientsList;