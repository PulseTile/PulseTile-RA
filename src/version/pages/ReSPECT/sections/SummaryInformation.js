import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { summaryInformationAction } from "../../../actions/ReSPECT/summaryInformationAction";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { TOTAL_ROWS_NUMBER } from "../statuses";
import { getSectionStatus } from "../functions";

const FORM_FIELDS_NUMBER = 2;

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
};

const styles = {
    formGroup: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    formLabel: {
        display: "block",
        fontWeight: 800,
        color: "#000",
        fontSize: 14,
        marginBottom: 5,
    },
    formInput: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
    },
    formTextarea: {
        width: '100%',
        height: 180,
        paddingLeft: 10,
    },
    formHelpText: {
        marginBottom: 5,
    },
};

class SummaryInformation extends Component {

    state = {
        isMainPanel: true,
    };

    submitForm = data => {
        const additionalData = {
            status: getSectionStatus(data, FORM_FIELDS_NUMBER),
            dateCompleted: moment().format('DD-MMM-YYYY'),
        };
        const formData = Object.assign({}, data, additionalData);
        this.props.addSummaryInformation(formData);
        const nextStep = (this.props.currentRow > TOTAL_ROWS_NUMBER) ? null : (this.props.currentRow + 1);
        this.props.onRowClick(nextStep);
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    render() {
        const { classes, summaryInformation, title, onRowClick } = this.props;
        const { isMainPanel } = this.state;
        const filledValues = Object.assign({}, defaultValues, summaryInformation);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <LocalForm  model="summaryInformation" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Summary of relevant information for this plan.</FormLabel>
                            <Control.textarea className={classes.formTextarea} model="summaryInformation.summary" defaultValue={filledValues.summary} />
                            <FormHelperText>Including diagnosis, communication needs (e.g. interpreter, communication aids) and reasons for the preferences and recomendations recorder.</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Details of other relevant planning documents</FormLabel>
                            <Control.textarea className={classes.formTextarea} model="summaryInformation.details" defaultValue={filledValues.summary} />
                            <FormHelperText>
                                Details of other relevant planning documents and where to find them (e.g. Advance Decision to Refuse Treatment, Advance Care Plan). Also include known wishes about organ donation.
                            </FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date Completed</FormLabel>
                            <Control.text className={classes.formInput} model="summaryInformation.dateCompleted" defaultValue={filledValues.dateCompleted} disabled />
                        </FormGroup>
                        <SectionToolbar onRowClick={onRowClick} />
                    </LocalForm>
                </MainFormBlock>
                <SystemInformationBlock isMainPanel={isMainPanel} togglePanel={this.togglePanel} classes={classes} info={summaryInformation} />
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        summaryInformation: state.custom.summaryInformation.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addSummaryInformation(data) {
            dispatch(summaryInformationAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SummaryInformation));


{/*<SimpleForm save={e => this.submitForm(e)} defaultValue={filledValues} toolbar={<SectionToolbar onRowClick={onRowClick} />}>*/}
    {/*<TextInput*/}
        {/*rows="4"*/}
        {/*source="summary"*/}
        {/*label="Summary of relevant information for this plan."*/}
        {/*multiline*/}
        {/*fullWidth*/}
    {/*/>*/}
    {/*<FormHelperText className={classes.textBelow}>*/}
        // {/**/}
    {/*</FormHelperText>*/}
    {/*<TextInput*/}
        {/*rows="4"*/}
        {/*source="details"*/}
        {/*label="Details of other relevant planning documents"*/}
        {/*multiline*/}
        {/*fullWidth*/}
    {/*/>*/}
    {/*<FormHelperText className={classes.textBelow}>*/}
    {/*</FormHelperText>*/}
    {/*<DisabledInput className={classes.labelBlock} source="dateCompleted" label="Date Completed" />*/}
{/*</SimpleForm>*/}
