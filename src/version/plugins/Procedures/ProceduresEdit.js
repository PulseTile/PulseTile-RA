import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Form from "./fragments/Form";
import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";

/**
 * This component returns block with edit form for Procedure
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const ProceduresEdit = ({ classes, ...rest }) => (
    <EditTemplate isCustom={true}  blockTitle="Procedure"  {...rest}>
        <Form />
    </EditTemplate>
);

export default ProceduresEdit;