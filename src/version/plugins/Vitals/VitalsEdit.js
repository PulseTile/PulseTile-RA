import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Inputs from "./fragments/Form";

/**
 * This component returns block with edit form for Vitals
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const VitalsEdit = ({ classes, ...rest }) => (
    <EditTemplate isCustom={true} blockTitle="Vitals"  {...rest}>
        <Inputs />
    </EditTemplate>
);

export default VitalsEdit;