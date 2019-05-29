import React from "react";
import moment from "moment";

import TableCell from '@material-ui/core/TableCell';

import CustomDatagridRow from "../../../../core/common/ResourseTemplates/fragments/CustomDatagridRow";
import { DATE_FORMAT } from "../../../../core/common/ResourseTemplates/fragments/constants";

const ReferralsDatagridRow = props => {
    const { record } = props;
    if (!record) {
        return null;
    }
    return (
        <CustomDatagridRow {...props} >
            <TableCell key={`${record.id}-dateOfReferral`}>
                {moment(record.dateOfReferral).format(DATE_FORMAT)}
            </TableCell>
            <TableCell key={`${record.id}-referralFrom`}>
                {record.referralFrom}
            </TableCell>
            <TableCell key={`${record.id}-referralTo`}>
                {record.referralTo}
            </TableCell>
            <TableCell key={`${record.id}-source`}>
                {record.source}
            </TableCell>
        </CustomDatagridRow>
    );
};

export default ReferralsDatagridRow;
