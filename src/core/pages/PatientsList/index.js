import React, { Component } from "react";
import { connect } from 'react-redux';
import { TextField, DateField, ShowButton } from "react-admin";

import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import ViewButton from "../../common/Buttons/ViewButton";
import PatientCreate from "./PatientCreate";
import PatientEdit from "./PatientEdit";
import PatientShow from "./PatientShow";

/**
 * This component returns block with Patients list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
class PatientsList extends Component {

    /**
     * This function redirects to Patient Summary page
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {shape} e
     * @param {shape} record
     */
    redirectToSummary = (e, record) => {
        e.stopPropagation();
        this.props.updateCurrentPatient(record);
        localStorage.setItem('patientId', record.nhsNumber);
        this.props.history.push('/summary');
    };

    render() {
        return (
            <ListTemplate
                basePath="/patients"
                create={PatientCreate}
                edit={PatientEdit}
                show={PatientShow}
                resourceUrl="patients"
                title="Patients List"
                {...this.props}
            >
                <TextField source="name" label="Name" />
                <TextField source="address" label="Address" />
                <DateField source="dateOfBirth" label="Born" />
                <TextField source="nhsNumber" label="CHI No." />
                <ViewButton viewAction={this.redirectToSummary} />
            </ListTemplate>
        )
    }
}

export default PatientsList;