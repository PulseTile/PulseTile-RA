import React from "react";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../../core/common/ResourseTemplates/ListTemplate";
import TransferOfCareCreate from "./TransferOfCareCreate";
import TransferOfCareEdit from "./TransferOfCareEdit";
import TransferOfCareShow from "./TransferOfCareShow";
import DatagridRow from "./fragments/DatagridRow";

/**
 * This component returns block with TransferOfCare list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const TransferOfCareList = ({ classes, ...rest }) => (
    <ListTemplate
      create={TransferOfCareCreate}
      edit={TransferOfCareEdit}
      show={TransferOfCareShow}
      resourceUrl="toc"
      title="Transfers of Care"
      CustomRow={DatagridRow}
      isCustomDatagrid={true}
      {...rest}
    >
        <TextField label="From (Site / Org)" source="from" />
        <TextField label="To (Site / Org)" source="to" />
        <DateField label="Date / Time" source="transferDateTime" />
        <TextField label="Source" source="source" />
    </ListTemplate>
);

export default TransferOfCareList;
