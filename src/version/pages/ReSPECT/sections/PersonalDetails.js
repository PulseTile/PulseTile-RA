import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleForm, TextInput, DateInput, DisabledInput } from "react-admin";
import moment from "moment";

import { respectPersonalDetailsAction } from "../../../actions/respectPersonalDetails";

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
    nhsNumber: localStorage.getItem('userId'),
};

class PersonalDetails extends Component {

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        this.props.getPersonalDetails(userId);
    }

    submitForm = data => {
        this.props.addPersonalDetails(data);
    };

    render() {
        const { classes, personalDetails } = this.props;
        return (
            <SimpleForm save={e => this.submitForm(e)} defaultValue={defaultValues}>
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

