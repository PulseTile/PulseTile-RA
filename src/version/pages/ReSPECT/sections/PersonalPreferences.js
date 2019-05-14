import React, { Component } from 'react';
import get from "lodash/get";
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { personalPreferencesAction } from "../../../actions/ReSPECT/personalPreferencesAction";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import RangeLine from "../fragments/RangeLine";
import { TOTAL_ROWS_NUMBER, DATE_FORMAT } from "../statuses";
import { getSectionStatus, getFilledValues, getStateData } from "../functions";
import formStyles from "../fragments/formStyles";

const FORM_FIELDS_NUMBER = 2;

const defaultValues = {
    author: localStorage.getItem('username'),
};

class PersonalPreferences extends Component {

    state = {
        isMainPanel: true,
        preferencesValue: [getStateData(this.props, 'personalPreferences.preferencesValue', 50)],
    };

    submitForm = data => {
        const { preferencesValue } = this.state;
        const userPreferencesValue = get(preferencesValue, '[0]', 1);
        const additionalData = {
            preferencesValue: (userPreferencesValue >= 1) ? userPreferencesValue : 1,
            dateCompleted: moment().format(DATE_FORMAT),
        };
        const formData = Object.assign({}, data, additionalData);
        formData.status = getSectionStatus(formData, FORM_FIELDS_NUMBER);
        this.props.addPersonalPreferences(formData);
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
            preferencesValue: values
        })
    };

    render() {
        const { classes, sectionsInfo, latestVersionInfo, personalPreferences, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel, preferencesValue } = this.state;
        const filledValues = getFilledValues(sectionsInfo, latestVersionInfo, personalPreferences, 'personalPreferences', isVersionInfo, defaultValues);
        return (
            <React.Fragment>
                <MainFormBlock isVersionInfo={isVersionInfo} isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <RangeLine
                        onChangeRange={this.setRangeInput}
                        sourceName={preferencesValue}
                        title="How would you balance your priorities for care?"
                        helpTitle="Please mark along the scale"
                        leftText="Prioritising sustaining life, even at the expense of some comfort"
                        rightText="Prioritising comfort, even at the expense of saving life"
                    />
                    <LocalForm model="personalPreferences" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Considering the priorities above, what is more important to you?</FormLabel>
                            <Control.textarea
                                className={classes.formTextarea}
                                model="personalPreferences.preferencesText"
                                defaultValue={filledValues.preferencesText}
                                disabled={isVersionInfo}
                            />
                            <FormHelperText className={classes.formHelpText}>Optional</FormHelperText>
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
        personalPreferences: state.custom.personalPreferences.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addPersonalPreferences(data) {
            dispatch(personalPreferencesAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(PersonalPreferences));
