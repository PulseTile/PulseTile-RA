import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { summaryInformationAction } from "../../../actions/ReSPECT/summaryInformationAction";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { TOTAL_ROWS_NUMBER, DATE_FORMAT } from "../statuses";
import { getSectionStatus, getFilledValues } from "../functions";
import formStyles from "../fragments/formStyles";

const FORM_FIELDS_NUMBER = 1;

const defaultValues = {
    author: localStorage.getItem('username'),
};

class SummaryInformation extends Component {

    state = {
        isMainPanel: true,
    };

    submitForm = data => {
        const additionalData = {
            status: getSectionStatus(data, FORM_FIELDS_NUMBER),
            dateCompleted: moment().format(DATE_FORMAT),
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
        const { classes, sectionsInfo, latestVersionInfo, summaryInformation, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel } = this.state;
        const filledValues = getFilledValues(sectionsInfo, latestVersionInfo, summaryInformation, 'summaryInformation', isVersionInfo, defaultValues);
        return (
            <React.Fragment>
                <MainFormBlock isVersionInfo={isVersionInfo} isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <LocalForm  model="summaryInformation" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Summary of relevant information for this plan.</FormLabel>
                            <Control.textarea
                                className={classes.formTextarea}
                                model="summaryInformation.summary"
                                defaultValue={filledValues.summary}
                                disabled={isVersionInfo}
                            />
                            <FormHelperText className={classes.formHelpText}>Including diagnosis, communication needs (e.g. interpreter, communication aids) and reasons for the preferences and recommendations recorded.</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Details of other relevant planning documents</FormLabel>
                            <Control.textarea
                                className={classes.formTextarea}
                                model="summaryInformation.details"
                                defaultValue={filledValues.details}
                                disabled={isVersionInfo}
                            />
                            <FormHelperText className={classes.formHelpText}>
                                Details of other relevant planning documents and where to find them (e.g. Advance Decision to Refuse Treatment, Advance Care Plan). Also include known wishes about organ donation.
                            </FormHelperText>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(SummaryInformation));
