import React, { Component } from 'react';
import get from "lodash/get";
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
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { TOTAL_ROWS_NUMBER, DATE_FORMAT, DATE_PICKER_FORMAT } from "../statuses";
import { getSectionStatus, getFilledValues } from "../functions";
import formStyles from "../fragments/formStyles";

const FORM_FIELDS_NUMBER = 9;

class PersonalDetails extends Component {

    state = {
        isMainPanel: true,
        birthDate: get(this.props, 'patientInfo.birthDate', null),
    };

    submitForm = data => {
        const { sectionsInfo, currentRow, onRowClick, addPersonalDetails } = this.props;
        const { birthDate } = this.state;
        const additionalData = {
            birthDate: birthDate,
            status: getSectionStatus(data, FORM_FIELDS_NUMBER),
            dateCompleted: moment().format(DATE_FORMAT),
        };
        const formData = Object.assign({}, data, additionalData);
        addPersonalDetails(formData);
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

    getUserNameInfo = totalName => {
        const totalNameArray = totalName.split(' ');
        const surname = totalNameArray.pop();
        const preferredName = totalNameArray.shift();
        return {
            preferredName: preferredName,
            firstName: totalNameArray.join(' '),
            surname: surname
        }
    };

    render() {
        const { classes, personalDetails, patientInfo, title, onRowClick, sectionsInfo, latestVersionInfo, isVersionInfo } = this.props;
        const { isMainPanel, birthDate } = this.state;

        const userNameInfo = patientInfo.name ? this.getUserNameInfo(patientInfo.name) : null;

        const defaultValues = {
            preferredName: userNameInfo ? userNameInfo.preferredName : null,
            firstName: userNameInfo ? userNameInfo.firstName : null,
            surname: userNameInfo ? userNameInfo.surname : null,
            streetAddress: patientInfo.address,
            city: patientInfo.city,
            county: patientInfo.district,
            country: patientInfo.country,
            postCode: patientInfo.postCode,
            nhsNumber: localStorage.getItem('userId'),
            author: localStorage.getItem('username'),
        };

        const filledValues = getFilledValues(sectionsInfo, latestVersionInfo, personalDetails, 'personalDetails', isVersionInfo, defaultValues);
        return (
            <React.Fragment>
                <MainFormBlock isVersionInfo={isVersionInfo} isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <LocalForm  model="personalDetails" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Preferred Name</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.preferredName"
                                defaultValue={filledValues.preferredName}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <FormLabel className={classes.formLabel}>First Name</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.firstName"
                                defaultValue={filledValues.firstName}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <FormLabel className={classes.formLabel}>Surname</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.surname"
                                defaultValue={filledValues.surname}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date of Birth</FormLabel>
                            <DatePicker
                                className={classes.formInput}
                                selected={birthDate ? birthDate : new Date(filledValues.birthDate)}
                                onChange={value => this.changeBirthDate(value)}
                                dateFormat={DATE_PICKER_FORMAT}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Address</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.streetAddress"
                                defaultValue={filledValues.streetAddress}
                                disabled
                            />
                            <FormHelperText className={classes.formHelpTextStreetAddress}>Street address</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.city"
                                defaultValue={filledValues.city}
                                disabled={true}
                            />
                            <FormHelperText className={classes.formHelpText}>City</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.county"
                                defaultValue={filledValues.county}
                                disabled
                            />
                            <FormHelperText className={classes.formHelpText}>County</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.postCode"
                                defaultValue={filledValues.postCode}
                                disabled
                            />
                            <FormHelperText className={classes.formHelpText}>Post code</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <Control.text
                                className={classes.formInput}
                                model="personalDetails.country"
                                defaultValue={filledValues.country}
                                disabled
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
                        {
                            !isVersionInfo &&
                                <SectionToolbar onRowClick={onRowClick} />
                        }
                    </LocalForm>
                </MainFormBlock>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        personalDetails: state.custom.personalDetails.data,
        patientInfo: get(state, 'custom.currentPatient.patientInfo.data', null),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addPersonalDetails(sectionData) {
            dispatch(personalDetailsAction.create(sectionData));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(PersonalDetails));

