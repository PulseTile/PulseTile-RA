import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns block with edit form for Referral
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const ReferralsEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Referral"  {...rest}>
        <Inputs />
    </EditTemplate>
);

export default ReferralsEdit;