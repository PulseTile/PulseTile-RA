import React from "react";

import EditTemplate from "../../common/ResourseTemplates/EditTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns block with edit form for Problems
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ProblemsEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Problems / Issues" {...rest}>
            <Inputs />
    </EditTemplate>
);

export default ProblemsEdit;