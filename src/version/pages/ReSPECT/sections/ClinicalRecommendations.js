import React, { Component } from 'react';
import get from "lodash/get";
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { clinicalRecommendationsAction } from "../../../actions/ReSPECT/clinicalRecommendationsAction";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { TOTAL_ROWS_NUMBER, DATE_FORMAT, DATE_PICKER_FORMAT } from "../statuses";
import { getSectionStatus, getFilledValues, getStateData, getInitialRangeLine, getDateUnix, getDateForDatepicker } from "../functions";
import RangeLine from "../fragments/RangeLine";
import RadioButtonName from "../fragments/RadioButtonName";
import formStyles from "../fragments/formStyles";
import { cprVariants, FOCUS_LEFT, FOCUS_RIGHT } from "../fragments/cprVariants";

const FORM_FIELDS_NUMBER = 3;

const defaultValues = {
    clinicalSignature: localStorage.getItem('username'),
    dateCompleted: moment().format(DATE_FORMAT),
    author: localStorage.getItem('username'),
};

class ClinicalRecommendations extends Component {

    state = {
        isMainPanel: true,
        cprValue: getStateData(this.props, 'clinicalRecommendations.cprValue'),
        focusValue: getInitialRangeLine(this.props, 'clinicalRecommendations.focusValue', FOCUS_LEFT, FOCUS_RIGHT, 50),
        firstSignature: null,
        secondSignature: null,
        dateCompleted: null,
    };

    submitForm = data => {
        const { focusValue, cprValue, dateCompleted } = this.state;
        const additionalData = {
            cprValue: cprValue,
            focusValue: get(focusValue, '[0]', 0) >= 50 ? FOCUS_RIGHT : FOCUS_LEFT,
            dateCompleted: dateCompleted ? moment(dateCompleted).format(DATE_FORMAT) : moment().format(DATE_FORMAT),
            dateDecision: getDateUnix(),
        };
        const formData = Object.assign({}, data, additionalData);
        formData.status = getSectionStatus(formData, FORM_FIELDS_NUMBER);
        this.props.addClinicalRecommendations(formData);
        const nextStep = (this.props.currentRow > TOTAL_ROWS_NUMBER) ? null : (this.props.currentRow + 1);
        this.props.onRowClick(nextStep);
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    setRangeInput = values => {
        const valueFromArray = get(values, [0], null);
        this.setState({
            focusValue: (valueFromArray > 50) ? [99] : [1]
        });
    };

    handleChecking = e => {
        this.setState({
            cprValue: e.target.value,
        })
    };

    addSignature = (name, ref) => {
        this.setState({
            [name]: ref,
        });
    };

    changeDateCompleted = value => {
        this.setState({
            dateCompleted: value,
        })
    };

    getDateToForm = (dateCompleted) => {
        const filledValues = this.getFilledValuesArray();
        const dateFromStorage = get(filledValues, 'dateCompleted', null);
        return dateCompleted ? dateCompleted : getDateForDatepicker(dateFromStorage);
    };

    render() {
        const { classes, sectionsInfo, latestVersionInfo, clinicalRecommendations, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel, focusValue, cprValue, dateCompleted } = this.state;
        const filledValues = getFilledValues(sectionsInfo, latestVersionInfo, clinicalRecommendations, 'clinicalRecommendations', isVersionInfo, defaultValues);

        const dateFromStorage = get(filledValues, 'dateCompleted', null);
        const dateToForm = dateCompleted ? dateCompleted : getDateForDatepicker(dateFromStorage);

        return (
            <React.Fragment>
                <MainFormBlock isVersionInfo={isVersionInfo} isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <RangeLine
                        onChangeRange={this.setRangeInput}
                        sourceName={focusValue}
                        title="Clinical recommendations for emergency care and treatment"
                        helpTitle="Please mark along the scale"
                        leftText="Focus on life sustaining treatment as per guidance below"
                        rightText="Focus on sympton control as per guidance below"
                    />
                    <LocalForm  model="clinicalRecommendations" onSubmit={values => this.submitForm(values)}>

                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Clinical Guidance</FormLabel>
                            <Control.textarea
                                className={classes.formTextarea}
                                model="clinicalRecommendations.clinicalGuidance"
                                defaultValue={filledValues.clinicalGuidance}
                                disabled={isVersionInfo}
                            />
                            <FormHelperText className={classes.formHelpText}>
                                Now provide clinical guidance on specific inverventions that may or may not be wanted or Clinically appropriate,
                                including being taken or admitted to hospital +/- receiving life support.
                            </FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>CPR recommendations</FormLabel>
                            <RadioGroup name="cprValue" className={classes.radioGroup} value={cprValue} onChange={e => this.handleChecking(e)}>
                                {cprVariants.map((item, key) => {
                                    return (
                                        <FormControlLabel
                                            key={key}
                                            value={item.id}
                                            disabled={isVersionInfo}
                                            control={<Radio />}
                                            label={<RadioButtonName mainTitle={item.mainTitle} helpTitle={item.helpTitle} />}
                                        />
                                    );
                                })}
                            </RadioGroup>
                        </FormGroup>

                        {/*<Signature name="secondSignature" onEnd={this.addSignature} />*/}
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Clinician signature</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="clinicalRecommendations.clinicalSignature"
                                defaultValue={filledValues.clinicalSignature}
                                disabled={true}
                            />
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date completed</FormLabel>
                            <DatePicker
                                className={classes.formInput}
                                selected={dateToForm}
                                onChange={value => this.changeDateCompleted(value)}
                                todayButton="Today"
                                disabled={isVersionInfo}
                                dateFormat={DATE_PICKER_FORMAT}
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
        clinicalRecommendations: state.custom.clinicalRecommendations.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addClinicalRecommendations(data) {
            dispatch(clinicalRecommendationsAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(ClinicalRecommendations));
