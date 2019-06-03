import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Form from "./fragments/Form";

/**
 * This component returns Procedure creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 */
const ProceduresCreate = props => (
    <CreateTemplate isCustom={true}  blockTitle="Procedure" {...props}>
        <Form isCreate={true} {...props} />
    </CreateTemplate>
);

export default ProceduresCreate;
