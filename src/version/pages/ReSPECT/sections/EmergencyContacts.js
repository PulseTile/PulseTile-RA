import React, { Component } from 'react';
import get from "lodash/get";
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import { emergencyContactsAction } from "../../../actions/ReSPECT/emergencyContactsAction";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import AddNewButton from "../fragments/AddNewButton";
import { TOTAL_ROWS_NUMBER } from "../statuses";
import { getSectionStatus } from "../functions";

const FORM_FIELDS_NUMBER = 9;

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
    nhsNumber: localStorage.getItem('userId'),
};

const styles = {
    formGroup: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    smallFormGroup: {
        display: "inline-block",
        width: "50%",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    mainFormLabel: {
        display: "block",
        fontWeight: 800,
        color: "#000",
        fontSize: 14,
        marginBottom: 5,
    },
    formLabel: {
        display: "block",
        color: "#000",
        fontSize: 12,
        marginBottom: 5,
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
    formHelpText: {
        marginBottom: 5,
    },
};

const contactsArray = [
    { id: 'Husband', name: 'Husband' },
    { id: 'Wife', name: 'Wife' },
    { id: 'Father', name: 'Father' },
    { id: 'Alone', name: 'Alone' },
    { id: 'Mother', name: 'Mother' },
    { id: 'Daughter', name: 'Daughter' },
    { id: 'Son', name: 'Son' },
    { id: 'Brother', name: 'Brother' },
    { id: 'Sister', name: 'Sister' },
    { id: 'Friend', name: 'Friend' },
    { id: 'Family friend', name: 'Family friend' },
    { id: 'Neighbour', name: 'Neighbour' },
    { id: 'District Nurse', name: 'District Nurse' },
    { id: 'Primary Care Worker', name: 'Primary Care Worker' },
    { id: 'Allocated social worker', name: 'Allocated social worker' },
    { id: 'Care C-ordinator', name: 'Care C-ordinator' },
];

class EmergencyContacts extends Component {

    state = {
        isMainPanel: true,
    };

    submitForm = data => {
        const additionalData = {
            status: getSectionStatus(data, FORM_FIELDS_NUMBER),
            dateCompleted: moment().format('DD-MMM-YYYY'),
        };
        const formData = Object.assign({}, data, additionalData);
        this.props.addEmergencyContacts(formData);
        const nextStep = (this.props.currentRow > TOTAL_ROWS_NUMBER) ? null : (this.props.currentRow + 1);
        this.props.onRowClick(nextStep);
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    addNewRow = () => {

    };

    render() {
        const { classes, emergencyContacts, title, onRowClick } = this.props;
        const { isMainPanel } = this.state;
        const filledValues = Object.assign({}, defaultValues, emergencyContacts);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <LocalForm  model="emergencyContacts" onSubmit={values => this.submitForm(values)}>

                        <FormGroup className={classes.smallFormGroup}>
                            <FormLabel className={classes.mainFormLabel}>Emergency contact</FormLabel>
                            <FormLabel className={classes.formLabel}>Role</FormLabel>
                            <Control.select className={classes.formSelect} model="emergencyContacts.role" defaultValue={filledValues.firstName}>
                                { contactsArray.map((item, key) => {
                                    return (
                                        <option key={key} value={item.id}>{item.name}</option>
                                    )
                                })}
                            </Control.select>
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <FormLabel className={classes.formLabel}>Name</FormLabel>
                            <Control.text className={classes.formInput} model="emergencyContacts.name" defaultValue={filledValues.firstName} />
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Telephone</FormLabel>
                            <Control.text className={classes.formInput} model="emergencyContacts.phone" defaultValue={filledValues.preferredName} />
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Other details</FormLabel>
                            <Control.textarea className={classes.formTextarea} model="emergencyContacts.details" defaultValue={filledValues.details} />
                        </FormGroup>
                        <AddNewButton onClick={this.addNewRow} />

                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.mainFormLabel}>Date Completed</FormLabel>
                            <Control.text className={classes.formInput} model="emergencyContacts.dateCompleted" defaultValue={filledValues.dateCompleted} disabled />
                        </FormGroup>
                        <SectionToolbar onRowClick={onRowClick} />
                    </LocalForm>
                </MainFormBlock>
                <SystemInformationBlock isMainPanel={isMainPanel} togglePanel={this.togglePanel} classes={classes} info={emergencyContacts} />
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        emergencyContacts: state.custom.emergencyContacts.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addEmergencyContacts(data) {
            dispatch(emergencyContactsAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmergencyContacts));
