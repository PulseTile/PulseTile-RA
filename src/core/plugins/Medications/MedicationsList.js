import React from "react";
import { Route } from "react-router";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import MedicationsCreate from "./MedicationsCreate";
import MedicationsEdit from "./MedicationsEdit";
import MedicationsShow from "./MedicationsShow";

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
      {...rest}
    >
        <TextField source="name" />
        <TextField source="doseAmount" />
        <TextField source="source" />
    </ListTemplate>
);

export default MedicationsList;
