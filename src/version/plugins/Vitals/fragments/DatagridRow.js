import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';

import { DANGER_COLOR, WARNING_COLOR, SUCCESS_COLOR } from "./settings";
import CustomDatagridRow from "../../../../core/common/ResourseTemplates/fragments/CustomDatagridRow";
import { DATE_FORMAT } from "../../../../core/common/ResourseTemplates/fragments/constants";

const styles = theme => ({
    newsScoreCellDanger: {
        borderLeft: `5px solid ${DANGER_COLOR} !important`
    },
    newsScoreCellWarning: {
        borderLeft: `5px solid ${WARNING_COLOR} !important`
    },
    newsScoreCellSuccess: {
        borderLeft: `5px solid ${SUCCESS_COLOR} !important`
    },
});


function defineColor(newsScoreValue) {
    let result = '';
    if (newsScoreValue > 6) {
        result = 'newsScoreCellDanger';
    } else if (newsScoreValue > 4) {
        result = 'newsScoreCellWarning';
    } else if (newsScoreValue > 0) {
        result = 'newsScoreCellSuccess';
    }
    return result;
};

const DatagridRow = props => {
    const { classes, record } = props;
    if (!record) {
        return null;
    }
    const newsScore = get(record, 'newsScore', null);
    const newsScoreCellClassName = defineColor(newsScore);
    return (
        <CustomDatagridRow {...props} >
            <TableCell key={`${record.id}-number`}>
                {record.number}
            </TableCell>
            <TableCell key={`${record.id}-dateCreate`}>
                {moment(record.dateCreate).format(DATE_FORMAT)}
            </TableCell>
            <TableCell className={classes[newsScoreCellClassName]} key={`${record.id}-newsScore`}>
                {record.newsScore}
            </TableCell>
            <TableCell key={`${record.id}-source`}>
                {record.source}
            </TableCell>
        </CustomDatagridRow>
    );
};

export default withStyles(styles)(DatagridRow);

