import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns Procedure creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ProceduresCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Procedure" {...rest}>
        <Inputs />
    </CreateTemplate>
);

export default ProceduresCreate;
