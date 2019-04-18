import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control, actions } from 'react-redux-form';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import { clinicalSignaturesAction } from "../../../actions/ReSPECT/clinicalSignaturesAction";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import AddNewButton from "../fragments/buttons/AddNewButton";
import TableOfRows from "../fragments/TableOfRows";
import { TOTAL_ROWS_NUMBER, STATUS_INCOMPLETE, STATUS_COMPLETED, DATE_FORMAT } from "../statuses";
import { getFilledValues, getStateData } from "../functions";
import formStyles from "../fragments/formStyles";
import WarningMessage from "../fragments/WarningMessage";

const defaultValues = {
    clinicalSignature: localStorage.getItem('username'),
    nhsNumber: localStorage.getItem('userId'),
    author: localStorage.getItem('username'),
};

const tableHeadersArray = [
    { id: 'clinicialName', label: 'Clinician Name', isNumeric: false, isBinary: false, isDate: false, disablePadding: true },
    { id: 'isSrc', label: 'SRC', isNumeric: false, isBinary: true, isDate: false, disablePadding: true },
    { id: 'dateAndTime', label: 'Date', isNumeric: false, isBinary: false, isDate: true, disablePadding: false },
];

class CliniciansSignatures extends Component {

    state = {
        isMainPanel: true,
        dateAndTime: null,
        rowsArray: getStateData(this.props, 'clinicalSignatures.signaturesArray', []),
    };

    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    submitForm = data => {
        const { rowsArray } = this.state;
        const additionalData = {
            signaturesArray: rowsArray,
            status: (rowsArray.length > 0) ? STATUS_COMPLETED : STATUS_INCOMPLETE,
            dateCompleted: moment().format(DATE_FORMAT),
        };
        const formData = Object.assign({}, data, additionalData);
        this.props.addCliniciansSignatures(formData);
        const nextStep = (this.props.currentRow > TOTAL_ROWS_NUMBER) ? null : (this.props.currentRow + 1);
        this.props.onRowClick(nextStep);
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    changeDateAndTime = value => {
        this.setState({
            dateAndTime: value,
        })
    };

    addNewRow = values => {
        const { rowsArray, dateAndTime } = this.state;
        const additionalData = {
            dateAndTime: dateAndTime,
        };
        const newRow = Object.assign({}, values, additionalData);
        const newRowsArray = rowsArray.concat(newRow);
        this.setState({
            rowsArray: newRowsArray,
            dateAndTime: null,
        });
        this.formDispatch(actions.reset('clinicalSignaturesRow'));
    };

    addSignature = (name, ref) => {
        this.setState({
            [name]: ref,
        });
    };

    render() {
        const { classes, sectionsInfo, latestVersionInfo, clinicalSignatures, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel, rowsArray, dateAndTime } = this.state;
        const filledValues = getFilledValues(sectionsInfo, latestVersionInfo, clinicalSignatures, 'clinicalSignatures', isVersionInfo, defaultValues);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <WarningMessage isVersionInfo={isVersionInfo} onRowClick={onRowClick} />
                    { (rowsArray && rowsArray.length > 0) &&
                        <TableOfRows headers={tableHeadersArray} rowsArray={rowsArray} />
                    }
                    { !isVersionInfo &&
                        <LocalForm
                            model="clinicalSignaturesRow"
                            onSubmit={values => this.addNewRow(values)}
                            getDispatch={(dispatch) => this.attachDispatch(dispatch)}
                        >
                            <FormGroup className={classes.formGroup}>
                                <FormLabel className={classes.mainFormLabel}>Clinician Signature</FormLabel>
                            </FormGroup>
                            <FormGroup className={classes.smallFormGroup}>
                                <FormLabel className={classes.formLabel}>Designation (grade / speciality)</FormLabel>
                                <Control.text
                                    className={classes.formInput}
                                    model="clinicalSignaturesRow.designation"
                                    required
                                />
                            </FormGroup>
                            <FormGroup className={classes.smallFormGroup}>
                                <FormLabel className={classes.formLabel}>Clinicial name</FormLabel>
                                <Control.text
                                    className={classes.formInput}
                                    model="clinicalSignaturesRow.clinicialName"
                                    required
                                />
                            </FormGroup>
                            <FormGroup className={classes.smallFormGroup}>
                                <FormLabel className={classes.formLabel}>GMC / NMC / HCPC number</FormLabel>
                                <Control.text
                                    className={classes.formInput}
                                    model="clinicalSignaturesRow.gmcNumber"
                                    required
                                />
                            </FormGroup>
                            <FormGroup className={classes.smallFormGroup}>
                                <FormLabel className={classes.formLabel}>Date & Time</FormLabel>
                                <DatePicker
                                    className={classes.formInput}
                                    selected={dateAndTime}
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="M/d/yyyy HH:mm"
                                    timeInputLabel="Time:"
                                    showTimeInput
                                    onChange={value => this.changeDateAndTime(value)}
                                />
                            </FormGroup>

                            {/*<Signature name="signature" onEnd={this.addSignature} isSubTitle={true}/>*/}
                            <FormGroup className={classes.formGroup}>
                                <FormLabel className={classes.formLabel}>Clinical signature</FormLabel>
                                <Control.text
                                    className={classes.formInput}
                                    model="clinicalSignaturesRow.clinicalSignature"
                                    defaultValue={filledValues.clinicalSignature}
                                />
                            </FormGroup>

                            <FormGroup className={classes.smallFormGroup}>
                                <Control.checkbox className={classes.checkbox} model="clinicalSignaturesRow.isSrc" disabled={isVersionInfo}/>
                                <Typography>Senior responsible clinician</Typography>
                            </FormGroup>
                            <AddNewButton />
                        </LocalForm>
                    }
                    <LocalForm  model="clinicalSignatures" onSubmit={values => this.submitForm(values)}>
                        { !isVersionInfo && <SectionToolbar onRowClick={onRowClick} /> }
                    </LocalForm>

                </MainFormBlock>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        clinicalSignatures: state.custom.clinicalSignatures.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addCliniciansSignatures(data) {
            dispatch(clinicalSignaturesAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(CliniciansSignatures));
