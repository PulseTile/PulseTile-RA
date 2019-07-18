import React from "react";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../../core/common/ResourseTemplates/ListTemplate";
import VitalsCreate from "./VitalsCreate";
import VitalsEdit from "./VitalsEdit";
import VitalsShow from "./VitalsShow";
import VitalsChart from "./VitalsChart";
import VitalsDatagridRow from "./fragments/DatagridRow";

/**
 * This component returns block with Vitals list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const VitalsList = ({ classes, ...rest }) => (
    <ListTemplate
        create={VitalsCreate}
        edit={VitalsEdit}
        show={VitalsShow}
        chartBlock={VitalsChart}
        CustomRow={VitalsDatagridRow}
        resourceUrl="vitalsigns"
        title="Vitals"
        defaultSort="number"
        defaultSortOrder="ASC"
        hasChart={true}
        isCustomDatagrid={true}
        isChartDefault={true}
        {...rest}
    >
        <DateField label="#" source="number" />
        <DateField label="Date" source="dateCreated" />
        <TextField label="NEWS Score" source="newsScore" />
        <TextField label="Source" source="source" />
    </ListTemplate>
);

export default VitalsList;
