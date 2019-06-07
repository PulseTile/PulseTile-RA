import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { involvementAction } from "../../../actions/ReSPECT/involvenentAction";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import InsertedRadioButtonGroup from "../fragments/InsertedRadioButtonGroup";
import { TOTAL_ROWS_NUMBER, DATE_FORMAT } from "../statuses";
import { getSectionStatus, getStateData, getFilledValues } from "../functions";
import formStyles from "../fragments/formStyles";

const FORM_FIELDS_NUMBER = 2;

const defaultValues = {
    author: localStorage.getItem('username'),
};

class Involvement extends Component {

    state = {
        isMainPanel: true,
        variant: getStateData(this.props, 'involvement.involvementValue'),
    };

    submitForm = data => {
        const { variant } = this.state;
        const additionalData = {
            involvementValue: variant,
            dateCompleted: moment().format(DATE_FORMAT),
        };
        const formData = Object.assign({}, data, additionalData);
        formData.status = getSectionStatus(formData, FORM_FIELDS_NUMBER);
        if (additionalData.involvementValue !== "valueSetD") {
            formData.notSelectingReason = "";
        }
        this.props.addInvolvement(formData);
        const nextStep = (this.props.currentRow > TOTAL_ROWS_NUMBER) ? null : (this.props.currentRow + 1);
        this.props.onRowClick(nextStep);
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    handleChange = event => {
        this.setState({ variant: event.target.value });
    };

    render() {
        const { classes, sectionsInfo, latestVersionInfo, involvement, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel, variant } = this.state;
        const filledValues = getFilledValues(sectionsInfo, latestVersionInfo, involvement, 'involvement', isVersionInfo, defaultValues);
        const InsertRadioValues = ['valueSetC1', 'valueSetC2', 'valueSetC3'];
        return (
            <React.Fragment>
                <MainFormBlock isVersionInfo={isVersionInfo} isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <LocalForm model="involvement" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>The clinician(s) signing this plan is/are confirming that (select A,B or C, OR complete section D below):</FormLabel>
                            <RadioGroup name="involvementValue" className={classes.radioGroup} value={variant} onChange={e => this.handleChange(e)}>
                                <FormControlLabel
                                    className={classes.formControlLabel}
                                    disabled={isVersionInfo}
                                    value="valueSetA"
                                    control={<Radio />}
                                    label="A - This person has the mental capacity to participate in making these recommendations. They have been fully involved in making this plan."
                                />
                                <FormControlLabel
                                    className={classes.formControlLabel}
                                    disabled={isVersionInfo}
                                    value="valueSetB"
                                    control={<Radio />}
                                    label="B - This person does not have the mental capacity to participate in making these recommendations. This plan has been made in accordance with capacity law, including, where applicable, in consultation with their legal proxy, or where no proxy, with relevant family members / friends."
                                />
                                <FormControlLabel
                                    className={classes.formControlLabel}
                                    disabled={isVersionInfo}
                                    value="valueSetC"
                                    control={<Radio />}
                                    label={
                                        <InsertedRadioButtonGroup
                                            isSelected={variant === 'valueSetC' || InsertRadioValues.indexOf(variant) !== -1}
                                            variant={variant}
                                            isVersionInfo={isVersionInfo}
                                            handleChange={this.handleChange}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    className={classes.formControlLabel}
                                    disabled={isVersionInfo}
                                    value="valueSetD"
                                    control={<Radio />}
                                    label="D - if no other option has been selected, valid reasons must be stated here"
                                />
                            </RadioGroup>
                        </FormGroup>
                        { (variant === 'valueSetD') &&
                            <FormGroup className={classes.formGroup}>
                                <Control.textarea
                                    className={classes.formTextarea}
                                    model="involvement.notSelectingReason"
                                    defaultValue={filledValues.notSelectingReason}
                                    disabled={isVersionInfo}
                                />
                                <FormHelperText className={classes.formHelpText}>Document full explanation in the clinical record</FormHelperText>
                            </FormGroup>
                        }
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Record date, names and roles of those involved in decision making, and where records of discussion can be found</FormLabel>
                            <Control.textarea
                                className={classes.formTextarea}
                                model="involvement.documentExplanation"
                                defaultValue={filledValues.documentExplanation}
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
        involvement: state.custom.involvement.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addInvolvement(data) {
            dispatch(involvementAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(Involvement));
