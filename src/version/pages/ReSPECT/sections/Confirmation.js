import React, { Component } from 'react';
import get from "lodash/get";
import { connect } from 'react-redux';
import { LocalForm, Control, actions } from 'react-redux-form';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import { confirmationAction } from "../../../actions/ReSPECT/confirmationAction";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import AddNewButton from "../fragments/buttons/AddNewButton";
import TableOfRows from "../fragments/TableOfRows";
import { TOTAL_ROWS_NUMBER, STATUS_COMPLETED, STATUS_INCOMPLETE, DATE_FORMAT, DATE_PICKER_FORMAT } from "../statuses";
import { getFilledValues, getStateData, getDateUnix, getDateForDatepicker } from "../functions";
import formStyles from "../fragments/formStyles";

const defaultValues = {
    nhsNumber: localStorage.getItem('userId'),
    author: localStorage.getItem('username'),
};

const tableHeadersArray = [
    { id: 'clinicialName', label: 'Clinician Name', isNumeric: false, isBinary: false, isDate: false, disablePadding: true },
    { id: 'designation', label: 'Designation', isNumeric: false, isBinary: false, isDate: false, disablePadding: true },
    { id: 'reviewDate', label: 'Date', isNumeric: false, isBinary: false, isDate: true, disablePadding: false },
];

class Confirmation extends Component {

    state = {
        isMainPanel: true,
        reviewDate: null,
        rowsArray: getStateData(this.props, 'confirmation.confirmationsArray', []),
        dateCompleted: null,
        clinicalSignature: localStorage.getItem('username'),
    };

    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    submitForm = data => {
        const { rowsArray, dateCompleted } = this.state;
        const additionalData = {
            confirmationsArray: rowsArray,
            status: (rowsArray.length > 0) ? STATUS_COMPLETED : STATUS_INCOMPLETE,
            dateCompleted: dateCompleted ? moment(dateCompleted).format(DATE_FORMAT) : moment().format(DATE_FORMAT),
        };
        const formData = Object.assign({}, data, additionalData);
        this.props.addConfirmations(formData);
        const nextStep = (this.props.currentRow > TOTAL_ROWS_NUMBER) ? null : (this.props.currentRow + 1);
        this.props.onRowClick(nextStep);
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    changeReviewDate = value => {
        this.setState({
            reviewDate: value,
        })
    };

    addNewRow = values => {
        const { rowsArray, reviewDate } = this.state;
        const additionalData = {
            reviewDate: getDateUnix(moment(reviewDate).format(DATE_FORMAT)),
        };
        const newRow = Object.assign({}, values, additionalData);
        const newRowsArray = rowsArray.concat(newRow);
        this.setState({
            rowsArray: newRowsArray,
            reviewDate: null,
        });
        this.formDispatch(actions.reset('confirmationRow'));
        this.formDispatch(actions.change('confirmationRow.clinicalSignature', localStorage.getItem('username')));
    };

    addSignature = (name, ref) => {
        this.setState({
            [name]: ref,
        });
    };

    changeDateCompleted = value => {
        this.setState({
            dateCompleted: value,
        })
    };

    render() {
        const { classes, sectionsInfo, latestVersionInfo, confirmation, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel, rowsArray, reviewDate, dateCompleted, clinicalSignature } = this.state;
        const filledValues = getFilledValues(sectionsInfo, latestVersionInfo, confirmation, 'confirmation', isVersionInfo, defaultValues);

        const dateFromStorage = get(filledValues, 'dateCompleted', null);
        const dateToForm = dateCompleted ? dateCompleted : getDateForDatepicker(dateFromStorage);

        return (
            <React.Fragment>
                <MainFormBlock isVersionInfo={isVersionInfo} isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    { (rowsArray && rowsArray.length > 0) &&
                        <TableOfRows headers={tableHeadersArray} rowsArray={rowsArray} />
                    }
                    { !isVersionInfo &&
                        <LocalForm model="confirmationRow" onSubmit={values => this.addNewRow(values)}
                                   getDispatch={(dispatch) => this.attachDispatch(dispatch)}>
                            <FormGroup className={classes.formGroup}>
                                <FormLabel className={classes.mainFormLabel}>Clinician Signature</FormLabel>
                            </FormGroup>
                            <FormGroup className={classes.smallFormGroup}>
                                <FormLabel className={classes.formLabel}>Review date</FormLabel>
                                <DatePicker
                                    className={classes.formInput}
                                    selected={reviewDate}
                                    onChange={value => this.changeReviewDate(value)}
                                    dateFormat={DATE_PICKER_FORMAT}
                                />
                            </FormGroup>
                            <FormGroup className={classes.smallFormGroup}>
                                <FormLabel className={classes.formLabel}>Designation (grade / speciality)</FormLabel>
                                <Control.text className={classes.formInput} model="confirmationRow.designation" required/>
                            </FormGroup>
                            <FormGroup className={classes.smallFormGroup}>
                                <FormLabel className={classes.formLabel}>Clinician name</FormLabel>
                                <Control.text className={classes.formInput} model="confirmationRow.clinicialName" required/>
                            </FormGroup>
                            <FormGroup className={classes.smallFormGroup}>
                                <FormLabel className={classes.formLabel}>GMC / NMC / HCPC number</FormLabel>
                                <Control.text className={classes.formInput} model="confirmationRow.gmcNumber" required/>
                            </FormGroup>

                            {/*<Signature name="signature" onEnd={this.addSignature} isSubTitle={true}/>*/}
                            <FormGroup className={classes.formGroup}>
                                <FormLabel className={classes.formLabel}>Clinician signature</FormLabel>
                                <Control.text
                                    className={classes.formInput}
                                    model="confirmationRow.clinicalSignature"
                                    defaultValue={clinicalSignature}
                                    disabled={true}
                                />
                            </FormGroup>

                            <AddNewButton />
                        </LocalForm>
                    }
                    <LocalForm model="confirmation" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date completed</FormLabel>
                            <DatePicker
                                className={classes.formInput}
                                selected={dateToForm}
                                onChange={value => this.changeDateCompleted(value)}
                                todayButton="Today"
                                dateFormat={DATE_PICKER_FORMAT}
                                disabled={isVersionInfo}
                            />
                        </FormGroup>
                        { !isVersionInfo && <SectionToolbar onRowClick={onRowClick} /> }
                    </LocalForm>
                </MainFormBlock>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        confirmation: state.custom.confirmation.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addConfirmations(data) {
            dispatch(confirmationAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(Confirmation));
