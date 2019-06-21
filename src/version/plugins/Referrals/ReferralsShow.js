import React from "react";
import { TextField, DateField } from "react-admin";

import ShowTemplate from "../../../core/common/ResourseTemplates/ShowTemplate";

/**
 * This component returns block with Referral details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const ReferralsShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Referral" {...rest}>
        <TextField source="referralFrom" label="Referral From" />
        <TextField source="referralTo" label="Referral To" />
        <DateField source="dateOfReferral" label="Date of Referral" />
        <TextField source="referralReason" label="Reason of Referral" />
        <TextField source="referralSummary" label="Clinical Summary" />
        <TextField source="author" label="Author" />
    </ShowTemplate>
);

export default ReferralsShow;