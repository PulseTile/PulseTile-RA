import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns block with edit form for MDT
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const MdtEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="MDT"  {...rest}>
        <Inputs />
    </EditTemplate>
);

export default MdtEdit;