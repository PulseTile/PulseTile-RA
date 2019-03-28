import React from "react";
import { Route } from "react-router";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../../core/common/ResourseTemplates/ListTemplate";
import VaccinationsCreate from "./VaccinationsCreate";
import VaccinationsEdit from "./VaccinationsEdit";
import VaccinationsShow from "./VaccinationsShow";

/**
 * This component returns block with Vaccinations list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const VaccinationsList = ({ classes, ...rest }) => (
    <ListTemplate
      create={VaccinationsCreate}
      edit={VaccinationsEdit}
      show={VaccinationsShow}
      resourceUrl="vaccinations"
      title="Vaccinations"
      {...rest}
    >
        <TextField label="Vaccination Name" source="vaccinationName" />
        <DateField label="Date and Time" source="dateCreated" />
        <TextField label="Source" source="source" />
    </ListTemplate>
);

export default VaccinationsList;
