import React from "react";

import CreateTemplate from "../../common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns Allergies creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 */
const AllergiesCreate = props => (
    <CreateTemplate blockTitle="Allergy" {...props}>
        <Inputs />
    </CreateTemplate>
);

export default AllergiesCreate;
