import React, { Component } from "react";
import { DisabledInput, TextInput, DateInput, LongTextInput } from "react-admin";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalForm, Control } from 'react-redux-form';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import { transferOfCareAction } from "../../../actions/transferOfCareAction";
import SectionToolbar from "./SectionToolbar";
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
    };

    changeDate = value => {
        this.setState({
            transferDateTime: value,
        });
    };

    selectRecord = value => {
        this.setState({
            recordType: value,
        });
    };

    submitForm = data => {
        const { createNewItem } = this.props;
        const { transferDateTime } = this.state;
        const additionalData = {
            transferDateTime: transferDateTime,
            dateCreated: moment().format('DD-MMM-YYYY'),
            userId: patientID,
        };
        const formData = Object.assign({}, data, additionalData);
        createNewItem(formData);
    };

    render() {
        const { classes } = this.props;
        const { transferDateTime, recordType } = this.state;
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
                        <select className={classes.formSelect} onChange={value => this.selectRecord(value)} required>
                            <option value=''>-- Select to --</option>
                            { recordsTypes.map((item, key) => {
                                return (
                                    <option key={key} value={item.id}>{item.label}</option>
                                )
                            })}
                        </select>
                    </FormGroup>

                    { recordType
                        ? <RecordsSelector classes={classes} />
                        : <Typography>No records added</Typography>
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

const mapDispatchToProps = dispatch => {
    return {
        createNewItem(data) {
            dispatch(transferOfCareAction.create(data));
        }
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(TransferOfCareInputs));
