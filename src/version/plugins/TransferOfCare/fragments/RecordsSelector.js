import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Table from '@material-ui/core/Table';

import TableHeadBlock from "./TableHeadBlock";
import TableBodyBlock from "./TableBodyBlock";

const styles = theme => ({
    tableWrapper: {
        padding: 20,
        overflowX: 'auto',
    },
    tableList: {
        '& thead': {
            backgroundColor: "#e5e5e5",
            '& tr th span span': {
                color: "#000",
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
            backgroundColor: theme.palette.mainColor,
        },
        '& tbody tr:hover td span': {
            color: "#fff"
        }
    },
});

class RecordsSelector extends Component {

    state = {
        recordsArray: [],
    };

    selectItem = e => {
        const { recordsList, recordType } = this.props;
        const { recordsArray } = this.state;
        let currentItem = null;
        for (let i = 0, n = recordsList.length; i < n; i++) {
            let item = recordsList[i];
            if (item.sourceId === e.target.value) {
                currentItem = item;
                break;
            }
        }
        if (currentItem) {
            recordsArray.push({
                name: this.getSelectorValue(currentItem, recordType),
                type: recordType,
                date: this.getDataValue(currentItem, recordType),
                source: get(currentItem, 'source', null),
            })
        }

        this.setState({
            recordsArray: recordsArray,
        });
    };

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

    getDataValue = (item, recordType) => {
        let result = '';
        if (recordType === 'problems') {
            result = moment(get(item, 'dateOfOnset', null)).format('DD-MM-YYYY');
        } else if (recordType === 'medications') {
            result = moment(get(item, 'dateCreated', null)).format('DD-MM-YYYY');
        } else if (recordType === 'referrals') {
            result = moment(get(item, 'dateOfReferral', null)).format('DD-MM-YYYY');
        }
        return result;
    };

    render() {
        const { classes, recordType, recordsList } = this.props;
        const { recordsArray } = this.state;

        console.log('recordsArray', recordsArray);

        return (
            <React.Fragment>
                <FormGroup className={classes.formGroup}>
                    <FormLabel className={classes.formLabel}>Records</FormLabel>
                    <select className={classes.formSelect} onChange={e => this.selectItem(e)} required>
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
                            <TableBodyBlock list={recordsArray} />
                        </Table>
                    </div>
                }

            </React.Fragment>
        );
    }

};

const mapStateToProps = state => {
    return {
        recordsList: get(state, 'custom.transferOfCare.list', [])
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(RecordsSelector));
