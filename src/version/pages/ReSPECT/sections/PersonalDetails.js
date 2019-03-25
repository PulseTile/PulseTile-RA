import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { personalDetailsAction } from "../../../actions/ReSPECT/personalDetailsAction";
import { versionsServerAction } from "../../../actions/ReSPECT/versionsServerAction";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { TOTAL_ROWS_NUMBER } from "../statuses";
import { getSectionStatus, getStateData, getFilledValues, getVersionData } from "../functions";
import formStyles from "../fragments/formStyles";

const FORM_FIELDS_NUMBER = 9;

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
    nhsNumber: localStorage.getItem('userId'),
    author: localStorage.getItem('username'),
};

class PersonalDetails extends Component {

    state = {
        isMainPanel: true,
        birthDate: getStateData(this.props, 'personalDetails.birthDate'),
    };

    submitForm = data => {
        const { sectionsInfo, currentRow, onRowClick, addPersonalDetails } = this.props;
        const { birthDate } = this.state;
        const additionalData = {
            birthDate: birthDate,
            status: getSectionStatus(data, FORM_FIELDS_NUMBER),
            dateCompleted: moment().format('DD-MMM-YYYY'),
        };
        const formData = Object.assign({}, data, additionalData);
        const versionData = getVersionData('personalDetails', formData, sectionsInfo);
        addPersonalDetails(formData, versionData);
        const nextStep = (currentRow > TOTAL_ROWS_NUMBER) ? null : (currentRow + 1);
        onRowClick(nextStep);
    };

    changeBirthDate = value => {
        this.setState({
            birthDate: value,
        })
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    render() {
        const { classes, personalDetails, title, onRowClick, sectionsInfo, latestVersionInfo, isVersionInfo } = this.props;
        const { isMainPanel, birthDate } = this.state;
        const filledValues = getFilledValues(sectionsInfo, latestVersionInfo, personalDetails, 'personalDetails', isVersionInfo, defaultValues);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <LocalForm  model="personalDetails" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Preferred Name</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.preferredName"
                                defaultValue={filledValues.preferredName}
                                disabled={isVersionInfo}
                            />
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <FormLabel className={classes.formLabel}>First Name</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.firstName"
                                defaultValue={filledValues.firstName}
                                disabled={isVersionInfo}
                            />
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <FormLabel className={classes.formLabel}>Surname</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.surname"
                                defaultValue={filledValues.surname}
                                disabled={isVersionInfo}
                            />
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date of Birth</FormLabel>
                            <DatePicker
                                className={classes.formInput}
                                selected={birthDate}
                                onChange={value => this.changeBirthDate(value)}
                                disabled={isVersionInfo}
                            />
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Address</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.streetAddress"
                                defaultValue={filledValues.streetAddress}
                                disabled={isVersionInfo}
                            />
                            <FormHelperText className={classes.formHelpText}>Street address</FormHelperText>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.addressSecondLine"
                                defaultValue={filledValues.addressSecondLine}
                                disabled={isVersionInfo}
                            />
                            <FormHelperText className={classes.formHelpText}>Address line 2</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.city"
                                defaultValue={filledValues.city}
                                disabled={isVersionInfo}
                            />
                            <FormHelperText className={classes.formHelpText}>City</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.county"
                                defaultValue={filledValues.county}
                                disabled={isVersionInfo}
                            />
                            <FormHelperText className={classes.formHelpText}>County</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.postCode"
                                defaultValue={filledValues.postCode}
                                disabled={isVersionInfo}
                            />
                            <FormHelperText className={classes.formHelpText}>Post code</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.country"
                                defaultValue={filledValues.country}
                                disabled={isVersionInfo}
                            />
                            <FormHelperText className={classes.formHelpText}>Country</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>NHS / CHI / Health Care Number</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.nhsNumber"
                                defaultValue={filledValues.nhsNumber}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date Completed</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.dateCompleted"
                                defaultValue={filledValues.dateCompleted}
                                disabled
                            />
                        </FormGroup>
                        {
                            !isVersionInfo &&
                                <SectionToolbar onRowClick={onRowClick} />
                        }
                    </LocalForm>
                </MainFormBlock>
                <SystemInformationBlock classes={classes} modelName="personalDetails" filledValues={filledValues} />
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        personalDetails: state.custom.personalDetails.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addPersonalDetails(sectionData, versionData) {
            dispatch(personalDetailsAction.create(sectionData));
            dispatch(versionsServerAction.put(versionData))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(PersonalDetails));

