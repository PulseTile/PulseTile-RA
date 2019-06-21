import React from "react";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../../core/common/ResourseTemplates/ListTemplate";
import ResultsShow from "./ResultsShow";
import DatagridRow from "./fragments/DatagridRow";

/**
 * This component returns block with Results list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const ResultsList = ({ classes, ...rest }) => (
    <ListTemplate
        show={ResultsShow}
        resourceUrl="labresults"
        title="Results"
        notCreate={true}
        CustomRow={DatagridRow}
        isCustomDatagrid={true}
        {...rest}
    >
        <DateField label="Test Name" source="testName" />
        <TextField label="Sample Taken" source="sampleTaken" />
        <TextField label="Date Created" source="dateCreated" />
        <TextField label="Source" source="source" />
    </ListTemplate>
);

export default ResultsList;
