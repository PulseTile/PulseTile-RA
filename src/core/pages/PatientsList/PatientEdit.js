import React from "react";

import EditTemplate from "../../common/ResourseTemplates/EditTemplate";
import FormInputs from "./fragments/FormInputs";

/**
 * This component returns block with edit form for Patient
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const PatientEdit = props => (
    <EditTemplate blockTitle="Patient" {...props}>
        <FormInputs />
    </EditTemplate>
);

export default PatientEdit;