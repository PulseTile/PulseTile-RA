import React from "react";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import ProblemsCreate from "./ProblemsCreate";
import ProblemsEdit from "./ProblemsEdit";
import ProblemsShow from "./ProblemsShow";
import DatagridRow from "./fragments/DatagridRow";

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
      defaultSort="dateOfOnset"
      CustomRow={DatagridRow}
      isCustomDatagrid={true}
      {...rest}
    >
        <TextField source="problem" label="Problem / Issue" />
        <DateField source="dateOfOnset" label="Date" />
        <TextField source="source" label="Source" />
    </ListTemplate>
);

export default (DiagnosisList);
