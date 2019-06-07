import React from "react";
import moment from "moment";

import TableCell from '@material-ui/core/TableCell';

import CustomDatagridRow from "../../../../core/common/ResourseTemplates/fragments/CustomDatagridRow";
import { DATE_FORMAT } from "../../../../core/common/ResourseTemplates/fragments/constants";

const TopThreeThingsDatagridRow = props => {
    const { record } = props;
    if (!record) {
        return null;
    }
    return (
        <CustomDatagridRow {...props} >
            <TableCell key={`${record.id}-dateCreated`}>
                {moment(record.dateCreated).format(DATE_FORMAT)}
            </TableCell>
            <TableCell key={`${record.id}-name1`}>
                {record.name1}
            </TableCell>
            <TableCell key={`${record.id}-name2`}>
                {record.name2}
            </TableCell>
            <TableCell key={`${record.id}-name3`}>
                {record.name3}
            </TableCell>
            <TableCell key={`${record.id}-source`}>
                {record.source}
            </TableCell>
        </CustomDatagridRow>
    );
};

export default TopThreeThingsDatagridRow;
