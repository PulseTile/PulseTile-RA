import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Table from '@material-ui/core/Table';

import TableHeadBlock from "./TableHeadBlock";
import TableBodyBlock from "./TableBodyBlock";

const styles = theme => ({
    tableWrapper: {
        margin: 20,
    },
    tableList: {
        '& thead': {
            backgroundColor: theme.palette.borderColor,
            '& tr th span span': {
                color: theme.palette.fontColor,
            },
            '& tr th': {
                paddingLeft: 10,
            },
            '& tr': {
                height: 48,
            },
        },
        '& tbody tr td': {
            paddingLeft: 10,
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.secondaryMainColor,
        },
        '& tbody tr:hover td  p': {
            color: theme.palette.paperColor,
        }
    },
});

class RecordsSelector extends Component {

    getSelectorValue = (item, recordType) => {
        let result = '';
        if (recordType === 'problems') {
            result = get(item, 'problem', null);
        } else if (recordType === 'medications') {
            result = get(item, 'name', null) + ' ' + get(item, 'doseAmount', null);
        } else if (recordType === 'referrals') {
            result = get(item, 'referralFrom', null) + ' ' + get(item, 'referralTo', null);
        }
        return result;
    };

    render() {
        const { classes, recordType, recordsList, selectItem, recordsArray, removeItem } = this.props;
        return (
            <React.Fragment>
                <FormGroup className={classes.formGroup}>
                    <FormLabel className={classes.formLabel}>Records</FormLabel>
                    <select className={classes.formSelect} onChange={e => selectItem(e)} required>
                        <option value=''>-- Select to --</option>
                        { recordsList && recordsList.map((item, key) => {
                            return (
                                <option key={key} value={item.sourceId}>{this.getSelectorValue(item, recordType)}</option>
                            )
                        })}
                    </select>
                </FormGroup>

                { (recordsArray && recordsArray.length > 0) &&
                    <div className={classes.tableWrapper}>
                        <Table className={classes.tableList} aria-labelledby="tableTitle">
                            <TableHeadBlock />
                            <TableBodyBlock list={recordsArray} removeItem={removeItem} />
                        </Table>
                    </div>
                }

            </React.Fragment>
        );
    }
};

export default withStyles(styles)(RecordsSelector);
