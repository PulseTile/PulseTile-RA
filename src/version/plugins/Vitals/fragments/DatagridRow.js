import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';

import { DANGER_COLOR, WARNING_COLOR, SUCCESS_COLOR } from "./settings";
import CustomDatagridRow from "../../../../core/common/ResourseTemplates/fragments/CustomDatagridRow";
import { DATE_FORMAT } from "../../../../core/common/ResourseTemplates/fragments/constants";
import { vitalsAction } from "../../../actions/vitalsAction";

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

function getNumberFromStore(currentVitals, record) {
    let result = null;
    if (currentVitals) {
        for (let i = 0, n = currentVitals.length; i < n; i++) {
            let item = currentVitals[i];
            if (record.id === item.id) {
                result = item.number;
            }
        }
    }
    return result;
}

function getRowNumber(currentVitals, currentList, record) {
    let result = null;
    const numberFromStore = getNumberFromStore(currentVitals, record);
    if (numberFromStore) {
        result = numberFromStore;
    } else if (record.number) {
        result = record.number;
    } else if (currentList) {
        result = currentList.length;
    }
    return result;
}

const DatagridRow = props => {
    const { classes, record, currentVitals, saveCurrentVital, currentList } = props;
    if (!record) {
        return null;
    }
    const newsScore = get(record, 'newsScore', null);
    const newsScoreCellClassName = defineColor(newsScore);
    const number = getRowNumber(currentVitals, currentList, record);
    return (
        <CustomDatagridRow {...props}>
            <TableCell key={`${record.id}-number`} onClick={() => saveCurrentVital(record.id, number)}>
                {number}
            </TableCell>
            <TableCell key={`${record.id}-dateCreate`} onClick={() => saveCurrentVital(record.id, number)}>
                {moment(record.dateCreated).format(DATE_FORMAT)}
            </TableCell>
            <TableCell className={classes[newsScoreCellClassName]} key={`${record.id}-newsScore`} onClick={() => saveCurrentVital(record.id, number)}>
                {record.newsScore}
            </TableCell>
            <TableCell key={`${record.id}-source`} onClick={() => saveCurrentVital(record.id, number)}>
                {record.source}
            </TableCell>
        </CustomDatagridRow>
    );
};

const mapStateToProps = (state)  => {
    return {
        currentVitals: get(state, 'custom.vitalsForChart.current', []),
        currentList: get(state, 'admin.resources.vitalsigns.list.ids', []),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveCurrentVital(id, vitalNumber) {
            dispatch(vitalsAction.current(id, vitalNumber));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DatagridRow));