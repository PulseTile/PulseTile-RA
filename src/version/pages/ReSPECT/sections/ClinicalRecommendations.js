import React, { Component } from 'react';
import get from "lodash/get";
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { clinicalRecommendationsAction } from "../../../actions/ReSPECT/clinicalRecommendationsAction";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { TOTAL_ROWS_NUMBER } from "../statuses";
import { getSectionStatus, getFilledValues, getStateData } from "../functions";
import RangeLine from "../fragments/RangeLine";
import RadioButtonName from "../fragments/RadioButtonName";
import Signature from "../fragments/Signature";

const FORM_FIELDS_NUMBER = 3;

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
        width: '98%',
        height: 180,
        padding: 10,
    },
    formHelpText: {
        marginBottom: 5,
    },
    radioGroup: {
        marginLeft: 25,
        marginBottom: 25,
    },
};

class ClinicalRecommendations extends Component {

    state = {
        isMainPanel: true,
        cprValue: getStateData(this.props, 'clinicalRecommendations.cprValue'),
        focusValue: [getStateData(this.props, 'clinicalRecommendations.focusValue', 50)],
        firstSignature: null,
        secondSignature: null,
    };

    submitForm = data => {
        const { focusValue, cprValue } = this.state;
        const additionalData = {
            cprValue: cprValue,
            focusValue: get(focusValue, '[0]', 0),
            dateCompleted: moment().format('DD-MMM-YYYY'),
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
        this.setState({
            focusValue: values
        })
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

    render() {
        const { classes, sectionsInfo, latestVersionInfo, clinicalRecommendations, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel, focusValue, cprValue } = this.state;
        const filledValues = getFilledValues(sectionsInfo, latestVersionInfo, clinicalRecommendations, 'clinicalRecommendations', isVersionInfo, defaultValues);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <RangeLine
                        onChangeRange={this.setRangeInput}
                        sourceName={focusValue}
                        title="Clinical recomendations for emergency care and treatment"
                        helpTitle="Please mark along the scale"
                        leftText="Focus on life sustaining treatment as per guidance below"
                        rightText="Focus on sympton control as per guidance below"
                    />
                    <LocalForm  model="clinicalRecommendations" onSubmit={values => this.submitForm(values)}>
                        <Signature name="firstSignature" onEnd={this.addSignature} />
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Clinical Guidance</FormLabel>
                            <Control.textarea
                                className={classes.formTextarea}
                                model="clinicalRecommendations.clinicalGuidance"
                                defaultValue={filledValues.clinicalGuidance}
                                disabled={isVersionInfo}
                            />
                            <FormHelperText>
                                Now provide clinical guidance on specific inverventions that may or may not be wanted or clinicaly appropriate,
                                includingbeing taken or admitted to hospital +/- receiving life support.
                            </FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>CPR recommendations</FormLabel>
                            <RadioGroup name="cprValue" className={classes.radioGroup} value={cprValue} onChange={e => this.handleChecking(e)}>
                                <FormControlLabel
                                    value="1"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label={<RadioButtonName mainTitle="CPR attempts recommended" helpTitle="Adult or child" />}
                                />
                                <FormControlLabel
                                    value="2"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label={<RadioButtonName mainTitle="For modified CPR" helpTitle="Child only, as detailed above" />}
                                />
                                <FormControlLabel
                                    value="3"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label={<RadioButtonName mainTitle="CPR attempts NOT recommended" helpTitle="Adult or child" />}
                                />
                            </RadioGroup>
                        </FormGroup>
                        <Signature name="secondSignature" onEnd={this.addSignature} />
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date Completed</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="clinicalRecommendations.dateCompleted"
                                defaultValue={filledValues.dateCompleted}
                                disabled
                            />
                        </FormGroup>
                        { !isVersionInfo && <SectionToolbar onRowClick={onRowClick} /> }
                    </LocalForm>
                </MainFormBlock>
                <SystemInformationBlock isMainPanel={isMainPanel} togglePanel={this.togglePanel} classes={classes} info={clinicalRecommendations} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClinicalRecommendations));
