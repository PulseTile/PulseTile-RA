import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns TopThreeThings editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const TopThreeThingsEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Top Three Things" {...rest}>
        <Inputs />
    </EditTemplate>
);

export default TopThreeThingsEdit;
