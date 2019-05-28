import React from "react";
import get from "lodash/get";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { DANGER_COLOR, WARNING_COLOR, SUCCESS_COLOR } from "./settings";

const styles = theme => ({
    tableRow: {
        '&:hover': {
            backgroundColor: theme.palette.secondaryMainColor + '!important',
            cursor: "pointer"
        },
        '&:hover td': {
            color: theme.palette.paperColor,
        },
    },
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

const VitalsDatagridRow = ({ classes, record, resource, id, history, children, basePath, ...rest }) => {
    if (!record) {
        return null;
    }
    const detailsPath = basePath + '/' + id;
    const newsScore = get(record, 'newsScore', null);
    const newsScoreCellClassName = defineColor(newsScore);
    return (
        <TableRow className={classes.tableRow} key={record.id} onClick={() => history.push(detailsPath)}>
            <TableCell key={`${record.id}-number`}>
                {record.number}
            </TableCell>
            <TableCell key={`${record.id}-dateCreate`}>
                {moment(record.dateCreate).format('DD-MM-YYYY')}
            </TableCell>
            <TableCell className={classes[newsScoreCellClassName]} key={`${record.id}-newsScore`}>
                {record.newsScore}
            </TableCell>
            <TableCell key={`${record.id}-source`}>
                {record.source}
            </TableCell>
        </TableRow>
    );

};

export default withStyles(styles)(VitalsDatagridRow);

