import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns MDT creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const MdtCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="MDT" {...rest}>
        <Inputs />
    </CreateTemplate>
);

export default MdtCreate;
