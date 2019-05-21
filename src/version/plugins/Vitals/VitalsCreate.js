import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Form";

/**
 * This component returns Vitals creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const VitalsCreate = ({ classes, ...rest }) => (
    <CreateTemplate isCustom={true} blockTitle="Vitals" {...rest}>
        <Inputs />
    </CreateTemplate>
);

export default VitalsCreate;
