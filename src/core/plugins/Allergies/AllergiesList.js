import React from "react";
import { Route } from "react-router";
import { TextField } from "react-admin";

import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import DetailsBlock from "./DetailsBlock";
import AllergiesCreate from "./AllergiesCreate";

/**
 * This component returns block with Allergies list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 */
const AllergiesList = props => (
    <ListTemplate
      details={DetailsBlock}
      create={AllergiesCreate}
      resourceUrl="allergies"
      title="Allergies"
      {...props}
    >
        <TextField source="cause" />
        <TextField source="reaction" />
        <TextField source="source" />
    </ListTemplate>
);

export default AllergiesList;
