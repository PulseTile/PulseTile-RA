import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Form from "./fragments/Form";

/**
 * This component returns Procedure creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ProceduresCreate = ({ classes, ...rest }) => (
    <CreateTemplate isCustom={true}  blockTitle="Procedure" {...rest}>
        <Form isCreate={true} />
    </CreateTemplate>
);

export default ProceduresCreate;
