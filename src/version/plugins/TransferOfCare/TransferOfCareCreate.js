import React, { Component } from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Form from "./fragments/Form";

/**
 * This component returns TransferOfCare creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 */
const TransferOfCareCreate = props => (
    <CreateTemplate isCustom={true} blockTitle="Transfer Of Care" {...props}>
        <Form isCreate={true} {...props} />
    </CreateTemplate>
);

export default TransferOfCareCreate;
