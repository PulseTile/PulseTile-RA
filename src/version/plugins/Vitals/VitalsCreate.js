import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Form from "./fragments/Form";

/**
 * This component returns Vitals creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const VitalsCreate = props => (
    <CreateTemplate isCustom={true} blockTitle="Vitals" {...props}>
        <Form isCreate={true} {...props} />
    </CreateTemplate>
);

export default VitalsCreate;
