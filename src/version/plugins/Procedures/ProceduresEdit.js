import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Form from "./fragments/Form";

/**
 * This component returns block with edit form for Procedure
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const ProceduresEdit = props => (
    <EditTemplate isCustom={true} blockTitle="Procedure"  {...props}>
        <Form {...props} />
    </EditTemplate>
);

export default ProceduresEdit;