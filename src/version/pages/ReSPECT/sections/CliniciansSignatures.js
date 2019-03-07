import React, { Component } from 'react';
import get from "lodash/get";
import { connect } from 'react-redux';
import { LocalForm, Control, actions } from 'react-redux-form';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import { clinicalSignaturesAction } from "../../../actions/ReSPECT/clinicalSignaturesAction";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import AddNewButton from "../fragments/AddNewButton";
import TableOfRows from "../fragments/TableOfRows";
import { TOTAL_ROWS_NUMBER, STATUS_COMPLETED, STATUS_INCOMPLETE } from "../statuses";

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

const tableHeadersArray = [
    { id: 'name', label: 'Name', isNumeric: false, disablePadding: true },
    { id: 'role', label: 'Role', isNumeric: false, disablePadding: true },
    { id: 'phone', label: 'Telephone', isNumeric: true, disablePadding: false },
];

class CliniciansSignatures extends Component {

    state = {
        isMainPanel: true,
        rowsArray: get(this.props, 'clinicalSignatures.signaturesArray', []),
    };

    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    submitForm = data => {
        const { rowsArray } = this.state;
        const additionalData = {
            signaturesArray: rowsArray,
            status: (rowsArray.length > 0) ? STATUS_COMPLETED : STATUS_INCOMPLETE,
            dateCompleted: moment().format('DD-MMM-YYYY'),
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

    addNewRow = values => {
        const { rowsArray } = this.state;
        const newRowsArray = rowsArray.concat(values);
        this.setState({
            rowsArray: newRowsArray,
        });
        this.formDispatch(actions.reset('clinicalSignaturesRow'));
    };

    render() {
        const { classes, clinicalSignatures, title, onRowClick } = this.props;
        const { isMainPanel, rowsArray } = this.state;
        const filledValues = Object.assign({}, defaultValues, clinicalSignatures);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    { (rowsArray && rowsArray.length > 0) &&
                        <TableOfRows headers={tableHeadersArray} rowsArray={rowsArray} />
                    }
                    <LocalForm
                        model="clinicalSignaturesRow"
                        onSubmit={values => this.addNewRow(values)}
                        getDispatch={(dispatch) => this.attachDispatch(dispatch)}
                    >

                        <FormGroup className={classes.smallFormGroup}>
                            <FormLabel className={classes.mainFormLabel}>Clinician signatures</FormLabel>
                            <FormLabel className={classes.formLabel}>Name</FormLabel>
                            <Control.text className={classes.formInput} model="clinicalSignaturesRow.name" required />
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Telephone</FormLabel>
                            <Control.text className={classes.formInput} model="clinicalSignaturesRow.phone" required />
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Other details</FormLabel>
                            <Control.textarea className={classes.formTextarea} model="clinicalSignaturesRow.details" />
                        </FormGroup>
                        <AddNewButton />
                    </LocalForm>

                    <LocalForm  model="emergencyContacts" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.mainFormLabel}>Date Completed</FormLabel>
                            <Control.text className={classes.formInput} model="clinicalSignatures.dateCompleted" defaultValue={filledValues.dateCompleted} disabled />
                        </FormGroup>
                        <SectionToolbar onRowClick={onRowClick} />
                    </LocalForm>

                </MainFormBlock>
                <SystemInformationBlock isMainPanel={isMainPanel} togglePanel={this.togglePanel} classes={classes} info={clinicalSignatures} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CliniciansSignatures));
