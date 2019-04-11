import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns Referrals creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ReferralsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Referrals" {...rest}>
        <Inputs />
    </CreateTemplate>
);

export default ReferralsCreate;
