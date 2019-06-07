import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control, actions } from 'react-redux-form';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import { emergencyContactsAction } from "../../../actions/ReSPECT/emergencyContactsAction";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import AddNewButton from "../fragments/buttons/AddNewButton";
import TableOfRows from "../fragments/TableOfRows";
import { TOTAL_ROWS_NUMBER, STATUS_COMPLETED, STATUS_INCOMPLETE, DATE_FORMAT } from "../statuses";
import { getFilledValues, getStateData } from "../functions";
import formStyles from "../fragments/formStyles";

const defaultValues = {
    nhsNumber: localStorage.getItem('userId'),
    author: localStorage.getItem('username'),
};

const tableHeadersArray = [
    { id: 'name', label: 'Name', isNumeric: false, isBinary: false, isDate: false, disablePadding: true },
    { id: 'role', label: 'Role', isNumeric: false, isBinary: false, isDate: false, disablePadding: true },
    { id: 'phone', label: 'Telephone', isNumeric: true, isBinary: false, isDate: false, disablePadding: false },
];

const contactsArray = [
    { id: 'Legal proxy or parent', label: 'Legal proxy or parent' },
    { id: 'Family or friend or other', label: 'Family or friend or other' },
    { id: 'GP', label: 'GP' },
    { id: 'Lead consultant', label: 'Lead consultant' },
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
            dateCompleted: moment().format(DATE_FORMAT),
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
                <MainFormBlock isVersionInfo={isVersionInfo} isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
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
                                <FormLabel className={classes.formLabel}>Emergency Contact Role</FormLabel>
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
                            <AddNewButton />
                        </LocalForm>
                    }
                    <LocalForm  model="emergencyContacts" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Other details</FormLabel>
                            <Control.textarea
                                className={classes.formTextarea}
                                model="emergencyContacts.details"
                                defaultValue={filledValues.details}
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
