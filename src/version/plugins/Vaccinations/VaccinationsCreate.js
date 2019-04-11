import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns Vaccinations creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const VaccinationsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Vaccination" {...rest}>
        <Inputs />
    </CreateTemplate>
);

export default VaccinationsCreate;
