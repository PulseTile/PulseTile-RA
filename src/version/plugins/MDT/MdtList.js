import React from "react";
import { Route } from "react-router";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../../core/common/ResourseTemplates/ListTemplate";
import MdtCreate from "./MdtCreate";
import MdtEdit from "./MdtEdit";
import MdtShow from "./MdtShow";

/**
 * This component returns block with MDT list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const MdtList = ({ classes, ...rest }) => (
    <ListTemplate
        create={MdtCreate}
        edit={MdtEdit}
        show={MdtShow}
        resourceUrl="mdt"
        title="Generic MDT"
        {...rest}
    >
        <DateField label="Date of Request" source="dateOfRequest" />
        <TextField label="Service / Team" source="serviceTeam" />
        <DateField label="Date of Meeting" source="dateOfMeeting" />
        <TextField label="Source" source="source" />
    </ListTemplate>
);

export default MdtList;
