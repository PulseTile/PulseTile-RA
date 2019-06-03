import React from "react";
import moment from "moment";

import TableCell from '@material-ui/core/TableCell';

import CustomDatagridRow from "../../../../core/common/ResourseTemplates/fragments/CustomDatagridRow";
import { DATE_FORMAT } from "../../../../core/common/ResourseTemplates/fragments/constants";

const ProceduresDatagridRow = props => {
    const { record } = props;
    if (!record) {
        return null;
    }
    return (
        <CustomDatagridRow {...props} >
            <TableCell key={`${record.id}-name`}>
                {record.name}
            </TableCell>
            <TableCell key={`${record.id}-date`}>
                {moment(record.date).format(DATE_FORMAT)}
            </TableCell>
            <TableCell key={`${record.id}-time`}>
                {moment(record.time).format('HH:mm')}
            </TableCell>
            <TableCell key={`${record.id}-source`}>
                {record.source}
            </TableCell>
        </CustomDatagridRow>
    );
};

export default ProceduresDatagridRow;
