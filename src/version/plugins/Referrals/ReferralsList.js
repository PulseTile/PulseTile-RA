import React from "react";
import { Route } from "react-router";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../../core/common/ResourseTemplates/ListTemplate";
import ReferralsCreate from "./ReferralsCreate";
import ReferralsEdit from "./ReferralsEdit";
import ReferralsShow from "./ReferralsShow";
import DatagridRow from "./fragments/DatagridRow";

/**
 * This component returns block with Personal Notes list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const ReferralsList = ({ classes, ...rest }) => (
    <ListTemplate
        create={ReferralsCreate}
        edit={ReferralsEdit}
        show={ReferralsShow}
        resourceUrl="referrals"
        title="Referrals"
        CustomRow={DatagridRow}
        isCustomDatagrid={true}
        {...rest}
    >
        <DateField label="Date of Referral" source="dateOfReferral" />
        <TextField label="Referral From" source="referralFrom" />
        <TextField label="Referral To" source="referralTo" />
        <TextField label="Source" source="source" />
    </ListTemplate>
);

export default ReferralsList;
