import React from "react";
import moment from "moment";

import TableCell from '@material-ui/core/TableCell';

import CustomDatagridRow from "../../../common/ResourseTemplates/fragments/CustomDatagridRow";
import { DATE_FORMAT } from "../../../common/ResourseTemplates/fragments/constants";

const MedicationsDatagridRow = props => {
    const { record } = props;
    if (!record) {
        return null;
    }
    return (
        <CustomDatagridRow {...props} >
            <TableCell key={`${record.id}-name`}>
                {record.name}
            </TableCell>
            <TableCell key={`${record.id}-dateCreated`}>
                {moment(record.dateCreated).format(DATE_FORMAT)}
            </TableCell>
            <TableCell key={`${record.id}-source`}>
                {record.source}
            </TableCell>
        </CustomDatagridRow>
    );
};

export default MedicationsDatagridRow;
