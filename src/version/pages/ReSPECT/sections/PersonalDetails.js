import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleForm, TextInput, DateInput, DisabledInput } from "react-admin";
import moment from "moment";

import { respectPersonalDetailsAction } from "../../../actions/respectPersonalDetails";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { STATUS_INCOMPLETE, STATUS_COMPLETED, TOTAL_ROWS_NUMBER } from "../statuses";

const FORM_FIELDS_NUMBER = 9;

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
    nhsNumber: localStorage.getItem('userId'),
};

class PersonalDetails extends Component {

    state = {
        isMainPanel: true,
    };

    getSectionStatus = data => {
        const filledNumber = Object.values(data).length;
        const filledRation = filledNumber / FORM_FIELDS_NUMBER;
        return (filledRation > 0.5) ? STATUS_COMPLETED : STATUS_INCOMPLETE;
    };

    submitForm = data => {
        data.status = this.getSectionStatus(data);
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
                    <SimpleForm save={e => this.submitForm(e)} defaultValue={filledValues} toolbar={<SectionToolbar onRowClick={onRowClick} />}>
                        <TextInput source="preferredName" label="Preferred Name" />
                        <TextInput source="fullName" label="Full Name" />
                        <DateInput source="dateOfBirth" label="Date of Birth" />
                        <TextInput source="streetAddress" label="Street address" />
                        <TextInput source="addressLine" label="Address line 2" />
                        <TextInput source="city" label="City" />
                        <TextInput source="county" label="County" />
                        <TextInput source="postCode" label="Post Code" />
                        <TextInput source="country" label="Country" />
                        <DisabledInput className={classes.labelBlock} source="nhsNumber" label="NHS / CHI / Health Care Number" />
                        <DisabledInput className={classes.labelBlock} source="dateCompleted" label="Date Completed" />
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
        getPersonalDetails(userId) {
            dispatch(respectPersonalDetailsAction.request(userId));
        },
        addPersonalDetails(data) {
            dispatch(respectPersonalDetailsAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);

