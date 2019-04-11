import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Form from "./fragments/Form";

/**
 * This component returns block with edit form for TransferOfCare
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const TransferOfCareEdit = ({ classes, ...rest }) => (
    <EditTemplate isCustom={true} blockTitle="Transfer Of Care" {...rest}>
        <Form />
    </EditTemplate>
);

export default TransferOfCareEdit;