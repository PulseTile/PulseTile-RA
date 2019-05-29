import React from "react";
import moment from "moment";

import TableCell from '@material-ui/core/TableCell';

import CustomDatagridRow from "../../../../core/common/ResourseTemplates/fragments/CustomDatagridRow";
import { DATE_FORMAT } from "../../../../core/common/ResourseTemplates/fragments/constants";

const TransferOfCareDatagridRow = props => {
    const { record } = props;
    if (!record) {
        return null;
    }
    return (
        <CustomDatagridRow {...props} >
            <TableCell key={`${record.id}-from`}>
                {record.from}
            </TableCell>
            <TableCell key={`${record.id}-to`}>
                {record.to}
            </TableCell>
            <TableCell key={`${record.id}-transferDateTime`}>
                {moment(record.transferDateTime).format(DATE_FORMAT)}
            </TableCell>
            <TableCell key={`${record.id}-source`}>
                {record.source}
            </TableCell>
        </CustomDatagridRow>
    );
};

export default TransferOfCareDatagridRow;
