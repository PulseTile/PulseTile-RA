import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalForm, Control } from 'react-redux-form';
import { connect } from 'react-redux';
import { crudUpdate, crudCreate } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import { transferOfCareAction } from "../../../actions/transferOfCareAction";
import SectionToolbar from "../../../../core/common/Toolbars/CustomFormToolbar";
import RecordsSelector from "./RecordsSelector";
import { selectors, recordsTypes } from "./selectors";

const styles = {
    formGroup: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    formLabel: {
        display: "block",
        fontWeight: 800,
        color: "#000",
        fontSize: 14,
        marginBottom: 15,
    },
    formInput: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
    },
    formSelect: {
        width: '100%',
        height: 30,
        paddingLeft: 10,
        backgroundColor: "#fff",
    },
    formTextarea: {
        width: '98%',
        height: 180,
        padding: 10,
    },
    text: {
        padding: 20,
    }
};

const patientID = localStorage.getItem('patientId') ? localStorage.getItem('patientId') : localStorage.getItem('userId');

/**
 * This component returns TransferOfCare creation/editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  classes
 * @param {string} modelName
 */
class TransferOfCareInputs extends Component {

    state = {
        transferDateTime: null,
        recordType: null,
        recordsArray: [],
    };

    changeDate = value => {
        this.setState({
            transferDateTime: value,
        });
    };

    selectRecord = e => {
        this.setState(
            { recordType: e.target.value },
            () => this.props.getSelectorItems(this.state.recordType)
        );
    };

    selectItem = e => {
        const { recordsList } = this.props;
        const { recordsArray, recordType } = this.state;
        let currentItem = null;
        const value = e.target.value;
        for (let i = 0, n = recordsList.length; i < n; i++) {
            let item = recordsList[i];
            if (item.sourceId === value) {
                currentItem = item;
                break;
            }
        }
        if (currentItem) {
            recordsArray.push({
                name: this.getSelectorValue(currentItem, recordType),
                type: recordType,
                typeTitle: recordType,
                date: this.getDataValue(currentItem, recordType),
                source: get(currentItem, 'source', null),
                sourceId: value,
            });

            this.props.getDetails(recordType, value);
        }

        this.setState({
            recordsArray: recordsArray,
        });
    };

    removeItem = sourceId => {
        const { recordsArray } = this.state;
        let newRecordsArray = [];
        for (let i = 0, n = recordsArray.length; i < n; i++) {
            let item = recordsArray[i];
            if (item.sourceId !== sourceId) {
                newRecordsArray.push(item);
            }
        }

        this.setState({
            recordsArray: newRecordsArray,
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

    submitForm = data => {
        const { history, isCreate, createNewItem, updateItem } = this.props;
        const { transferDateTime, recordsArray } = this.state;
        const additionalData = {
            transferDateTime: moment(transferDateTime).unix(),
            records: recordsArray,
            userId: patientID,
        };
        const formData = Object.assign({}, data, additionalData);
        if (isCreate) {
            createNewItem(formData);
        } else {
            const filledValues = this.getCurrentItem();
            const id = get(filledValues, 'sourceId', null);
            const source = get(filledValues, 'source', null);
            formData.id = id;
            formData.source = source;
            updateItem(id, formData, filledValues);
        }
    };

    getCurrentItem = () => {
        const { transfersOfCareList, location } = this.props;
        const pathname = get(location, 'pathname', null);
        const pathnameArray = pathname.split('/');
        const sourceId = get(pathnameArray, [2], null);
        const transfersOfCareListArray = Object.values(transfersOfCareList);
        let result = null;
        for (let i = 0, n = transfersOfCareListArray.length; i < n; i++) {
            let item = transfersOfCareListArray[i];
            if (item.sourceId === sourceId) {
                result = item;
                break;
            }
        }
        return result;
    };

    render() {
        const { classes, recordsList } = this.props;
        const { transferDateTime, recordType, recordsArray } = this.state;
        return (
            <React.Fragment>
                <LocalForm model="transferOfCare" onSubmit={values => this.submitForm(values)}>
                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>From (Site / Org)</FormLabel>
                        <Control.select className={classes.formSelect} model='transferOfCare.from' required>
                            <option value=''>-- Select from --</option>
                            { selectors.map((item, key) => {
                                return (
                                    <option key={key} value={item.id}>{item.label}</option>
                                )
                            })}
                        </Control.select>
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>From (Site / Org)</FormLabel>
                        <Control.select className={classes.formSelect} model='transferOfCare.to' required>
                            <option value=''>-- Select to --</option>
                            { selectors.map((item, key) => {
                                return (
                                    <option key={key} value={item.id}>{item.label}</option>
                                )
                            })}
                        </Control.select>
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Date of Transfer</FormLabel>
                        <DatePicker
                            className={classes.formInput}
                            selected={transferDateTime}
                            onChange={value => this.changeDate(value)}
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Type</FormLabel>
                        <select className={classes.formSelect} onChange={e => this.selectRecord(e)} required>
                            <option value=''>-- Select to --</option>
                            { recordsTypes.map((item, key) => {
                                return (
                                    <option key={key} value={item.id}>{item.label}</option>
                                )
                            })}
                        </select>
                    </FormGroup>

                    { recordType
                        ? <RecordsSelector
                            classes={classes}
                            recordType={recordType}
                            selectItem={this.selectItem}
                            removeItem={this.removeItem}
                            recordsArray={recordsArray}
                            recordsList={recordsList}
                        />
                        : <Typography className={classes.text}>No records added</Typography>
                    }

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Reason for contact</FormLabel>
                        <Control.textarea className={classes.formTextarea} model='transferOfCare.reasonForContact' />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Clinical Summary</FormLabel>
                        <Control.textarea className={classes.formTextarea} model='transferOfCare.clinicalSummary' />
                    </FormGroup>

                    <SectionToolbar {...this.props} />

                </LocalForm>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        transfersOfCareList: get(state, 'admin.resources.toc.data', []),
        recordsList: get(state, 'custom.transferOfCare.list', [])
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSelectorItems(data) {
            dispatch(transferOfCareAction.request(data));
        },
        getDetails(type, sourceId) {
            dispatch(transferOfCareAction.requestOne(type, sourceId));
        },
        createNewItem(formData) {
            dispatch(crudCreate('toc', formData, '/toc', '/toc'));
        },
        updateItem(id, formData, filledValues) {
            dispatch(crudUpdate('toc', id, formData,  filledValues, '/toc', '/toc'));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TransferOfCareInputs));
