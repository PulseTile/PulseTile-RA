import React from "react";
import { Route } from "react-router";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../../core/common/ResourseTemplates/ListTemplate";
import ProceduresCreate from "./ProceduresCreate";
import ProceduresEdit from "./ProceduresEdit";
import ProceduresShow from "./ProceduresShow";

/**
 * This component returns block with Procedures list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const ProceduresList = ({ classes, ...rest }) => (
    <ListTemplate
        create={ProceduresCreate}
        edit={ProceduresEdit}
        show={ProceduresShow}
        resourceUrl="procedures"
        title="Procedures"
        {...rest}
    >
        <TextField label="Procedure Name" source="procedureName" />
        <DateField label="Procedure Date" source="date" />
        <DateField label="Time" source="time" />
        <TextField label="Source" source="source" />
    </ListTemplate>
);

export default ProceduresList;
