import React from "react";

import CreateTemplate from "../../common/ResourseTemplates/CreateTemplate";
import FormInputs from "./fragments/FormInputs";

/**
 * This component returns Patient creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 */
const PatientCreate = props => (
    <CreateTemplate blockTitle="Patient" {...props}>
        <FormInputs />
    </CreateTemplate>
);

export default PatientCreate;

