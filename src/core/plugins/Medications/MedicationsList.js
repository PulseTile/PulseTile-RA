import React from "react";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import MedicationsCreate from "./MedicationsCreate";
import MedicationsEdit from "./MedicationsEdit";
import MedicationsShow from "./MedicationsShow";
import DatagridRow from "./fragments/DatagridRow";

/**
 * This component returns block with Medications list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
export const MedicationsList = ({ classes, ...rest }) => (
    <ListTemplate
      create={MedicationsCreate}
      edit={MedicationsEdit}
      show={MedicationsShow}
      resourceUrl="medications"
      title="Medications"
      CustomRow={DatagridRow}
      isCustomDatagrid={true}
      {...rest}
    >
        <TextField source="name" label="Name" />
        <DateField source="dateCreated" label="Date" />
        <TextField source="source" label="Source" />
    </ListTemplate>
);

export default MedicationsList;
