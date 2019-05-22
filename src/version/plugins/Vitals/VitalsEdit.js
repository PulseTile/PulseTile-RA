import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Form from "./fragments/Form";

/**
 * This component returns block with edit form for Vitals
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const VitalsEdit = props => (
    <EditTemplate isCustom={true} blockTitle="Vitals"  {...props}>
        <Form {...props} />
    </EditTemplate>
);

export default VitalsEdit;