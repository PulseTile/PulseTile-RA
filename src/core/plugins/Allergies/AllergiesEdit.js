import React from "react";

import EditTemplate from "../../common/ResourseTemplates/EditTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns block with edit form for Allergies
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const AllergiesEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Allergy"  {...rest}>
        <Inputs />
    </EditTemplate>
);

export default AllergiesEdit;
