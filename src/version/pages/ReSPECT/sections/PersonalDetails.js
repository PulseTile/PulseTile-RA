import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleForm, TextInput, DateInput, DisabledInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';

import { personalDetailsAction } from "../../../actions/ReSPECT/personalDetailsAction";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { TOTAL_ROWS_NUMBER } from "../statuses";
import { getSectionStatus } from "../functions";

const FORM_FIELDS_NUMBER = 9;

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
    nhsNumber: localStorage.getItem('userId'),
};

const styles = {
    formBlock: {
        '& .ra-input-firstName': {
            display: "inline-block",
            width: '50%',

        },
        '& .ra-input-surname': {
            display: "inline-block",
            width: '50%',
        },
        '& .ra-input-city': {
            display: "inline-block",
            width: '50%',

        },
        '& .ra-input-county': {
            display: "inline-block",
            width: '50%',
        },
        '& .ra-input-postCode': {
            display: "inline-block",
            width: '50%',

        },
        '& .ra-input-country': {
            display: "inline-block",
            width: '50%',
        }
    },
};

class PersonalDetails extends Component {

    state = {
        isMainPanel: true,
    };

    submitForm = data => {
        data.status = getSectionStatus(data, FORM_FIELDS_NUMBER);
        data.dateCompleted = moment().format('DD-MMM-YYYY');
        this.props.addPersonalDetails(data);
        const nextStep = (this.props.currentRow > TOTAL_ROWS_NUMBER) ? null : (this.props.currentRow + 1);
        this.props.onRowClick(nextStep);
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    render() {
        const { classes, personalDetails, title, onRowClick } = this.props;
        const { isMainPanel } = this.state;
        const filledValues = Object.assign({}, defaultValues, personalDetails);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <SimpleForm className={classes.formBlock} save={e => this.submitForm(e)} defaultValue={filledValues} toolbar={<SectionToolbar onRowClick={onRowClick} />}>
                        <TextInput source="preferredName" label="Preferred Name" fullWidth />
                        <TextInput source="firstName" label="First Name" />
                        <TextInput source="surname" label="Surname" />
                        <DateInput source="dateOfBirth" label="Date of Birth" fullWidth />
                        <TextInput source="streetAddress" label="Street address" fullWidth />
                        <TextInput source="addressLine" label="Address line 2" fullWidth />
                        <TextInput source="city" label="City" />
                        <TextInput source="county" label="County" />
                        <TextInput source="postCode" label="Post Code" />
                        <TextInput source="country" label="Country" />
                        <DisabledInput source="nhsNumber" label="NHS / CHI / Health Care Number" fullWidth />
                        <DisabledInput source="dateCompleted" label="Date Completed" fullWidth />
                    </SimpleForm>
                </MainFormBlock>
                <SystemInformationBlock isMainPanel={isMainPanel} togglePanel={this.togglePanel} classes={classes} info={personalDetails} />
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
        addPersonalDetails(data) {
            dispatch(personalDetailsAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonalDetails));

