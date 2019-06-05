import React from "react";

import TableCell from '@material-ui/core/TableCell';

import CustomDatagridRow from "../../../common/ResourseTemplates/fragments/CustomDatagridRow";

const ContactsDatagridRow = props => {
    const { record } = props;
    if (!record) {
        return null;
    }
    return (
        <CustomDatagridRow {...props} >
            <TableCell key={`${record.id}-name`}>
                {record.name}
            </TableCell>
            <TableCell key={`${record.id}-relationship`}>
                {record.relationship}
            </TableCell>
            <TableCell key={`${record.id}-nextOfKin`}>
                {record.nextOfKin ? 'Yes' : 'No'}
            </TableCell>
            <TableCell key={`${record.id}-source`}>
                {record.source}
            </TableCell>
        </CustomDatagridRow>
    );
};

export default ContactsDatagridRow;

