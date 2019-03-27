import React from "react";

import CreateTemplate from "../../common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns Problems creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ProblemsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Problems / Issue" {...rest}>
        <Inputs />
    </CreateTemplate>
);

export default ProblemsCreate;
