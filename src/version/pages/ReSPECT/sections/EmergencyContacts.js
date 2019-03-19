import React, { Component } from 'react';
import get from "lodash/get";
import { connect } from 'react-redux';
import { LocalForm, Control, actions } from 'react-redux-form';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import { emergencyContactsAction } from "../../../actions/ReSPECT/emergencyContactsAction";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import AddNewButton from "../fragments/AddNewButton";
import TableOfRows from "../fragments/TableOfRows";
import { TOTAL_ROWS_NUMBER, STATUS_COMPLETED, STATUS_INCOMPLETE } from "../statuses";
import { getFilledValues, getStateData } from "../functions";
import formStyles from "../fragments/formStyles";

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
    nhsNumber: localStorage.getItem('userId'),
};

const tableHeadersArray = [
    { id: 'name', label: 'Name', isNumeric: false, isBinary: false, isDate: false, disablePadding: true },
    { id: 'role', label: 'Role', isNumeric: false, isBinary: false, isDate: false, disablePadding: true },
    { id: 'phone', label: 'Telephone', isNumeric: true, isBinary: false, isDate: false, disablePadding: false },
];

const contactsArray = [
    { id: 'Husband', label: 'Husband' },
    { id: 'Wife', label: 'Wife' },
    { id: 'Father', label: 'Father' },
    { id: 'Mother', label: 'Mother' },
    { id: 'Daughter', label: 'Daughter' },
    { id: 'Son', label: 'Son' },
    { id: 'Brother', label: 'Brother' },
    { id: 'Sister', label: 'Sister' },
    { id: 'Friend', label: 'Friend' },
    { id: 'Family friend', label: 'Family friend' },
    { id: 'Neighbour', label: 'Neighbour' },
    { id: 'District Nurse', label: 'District Nurse' },
    { id: 'Primary Care Worker', label: 'Primary Care Worker' },
    { id: 'Allocated social worker', label: 'Allocated social worker' },
    { id: 'Care C-ordinator', label: 'Care C-ordinator' },
];

class EmergencyContacts extends Component {

    state = {
        isMainPanel: true,
        rowsArray: getStateData(this.props, 'emergencyContacts.contactsArray', []),
    };

    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    submitForm = data => {
        const { rowsArray } = this.state;
        const additionalData = {
            contactsArray: rowsArray,
            status: (rowsArray.length > 0) ? STATUS_COMPLETED : STATUS_INCOMPLETE,
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

    addNewRow = values => {
        const { rowsArray } = this.state;
        const newRowsArray = rowsArray.concat(values);
        this.setState({
            rowsArray: newRowsArray,
        });
        this.formDispatch(actions.reset('emergencyContactsRow'));
        this.formDispatch(actions.change('emergencyContactsRow.role', ''));
    };

    render() {
        const { classes, sectionsInfo, latestVersionInfo, emergencyContacts, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel, rowsArray } = this.state;
        const filledValues = getFilledValues(sectionsInfo, latestVersionInfo, emergencyContacts, 'emergencyContacts', isVersionInfo, defaultValues);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    { (rowsArray && rowsArray.length > 0) &&
                        <TableOfRows headers={tableHeadersArray} rowsArray={rowsArray} />
                    }
                    { !isVersionInfo &&
                        <LocalForm
                            model="emergencyContactsRow"
                            onSubmit={values => this.addNewRow(values)}
                            getDispatch={(dispatch) => this.attachDispatch(dispatch)}
                        >
                            <FormGroup className={classes.smallFormGroup}>
                                <FormLabel className={classes.formLabel}>Emergency contact role</FormLabel>
                                <Control.select className={classes.formSelect} model="emergencyContactsRow.role" required>
                                    <option value=''>(no selected)</option>
                                    { contactsArray.map((item, key) => {
                                        return (
                                            <option key={key} value={item.id}>{item.label}</option>
                                        )
                                    })}
                                </Control.select>
                            </FormGroup>
                            <FormGroup className={classes.smallFormGroup}>
                                <FormLabel className={classes.formLabel}>Name</FormLabel>
                                <Control.text className={classes.formInput} model="emergencyContactsRow.name" required/>
                            </FormGroup>
                            <FormGroup className={classes.formGroup}>
                                <FormLabel className={classes.formLabel}>Telephone</FormLabel>
                                <Control.text className={classes.formInput} model="emergencyContactsRow.phone" required/>
                            </FormGroup>
                            <FormGroup className={classes.formGroup}>
                                <FormLabel className={classes.formLabel}>Other details</FormLabel>
                                <Control.textarea className={classes.formTextarea} model="emergencyContactsRow.details"/>
                            </FormGroup>
                            <AddNewButton />
                        </LocalForm>
                    }
                    <LocalForm  model="emergencyContacts" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.mainFormLabel}>Date Completed</FormLabel>
                            <Control.text className={classes.formInput} model="emergencyContacts.dateCompleted" defaultValue={filledValues.dateCompleted} disabled />
                        </FormGroup>
                        { !isVersionInfo && <SectionToolbar onRowClick={onRowClick} /> }
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(EmergencyContacts));
