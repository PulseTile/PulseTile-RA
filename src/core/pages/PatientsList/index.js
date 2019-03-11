import React from "react";
import { connect } from 'react-redux';
import { TextField, DateField, ShowButton } from "react-admin";

import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import CustomShowButton from "../../common/Buttons/CustomShowButton";
import PatientCreate from "./PatientCreate";
import PatientEdit from "./PatientEdit";
import PatientShow from "./PatientShow";

/**
 * This component returns block with Patients list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
export const PatientsList = props => (
    <ListTemplate
        basePath="/patients"
        create={PatientCreate}
        edit={PatientEdit}
        show={PatientShow}
        resourceUrl="patients"
        title="Patients List"
        {...props}
    >
        <TextField source="name" label="Name" />
        <TextField source="address" label="Address" />
        <DateField source="dateOfBirth" label="Born" />
        <TextField source="nhsNumber" label="CHI No." />
        <CustomShowButton {...props} />
    </ListTemplate>
);

export default PatientsList;