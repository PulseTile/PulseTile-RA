import React from "react";
import { Route } from "react-router";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import ProblemsCreate from "./ProblemsCreate";
import ProblemsEdit from "./ProblemsEdit";
import ProblemsShow from "./ProblemsShow";

/**
 * This component returns block with Diagnosis list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const DiagnosisList = ({ classes, ...rest }) => (
    <ListTemplate
      create={ProblemsCreate}
      edit={ProblemsEdit}
      show={ProblemsShow}
      resourceUrl="problems"
      title="Problems / Issues"
      {...rest}
    >
        <TextField source="problem" />
        <DateField source="dateOfOnset" />
        <TextField source="source" />
    </ListTemplate>
);

export default (DiagnosisList);
