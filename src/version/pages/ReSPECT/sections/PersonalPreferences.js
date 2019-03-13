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
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import RangeLine from "../fragments/RangeLine";
import { TOTAL_ROWS_NUMBER } from "../statuses";
import { getSectionStatus, getFilledValues, getStateData } from "../functions";

const FORM_FIELDS_NUMBER = 2;

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
};

const styles = theme => ({
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
});

class PersonalPreferences extends Component {

    state = {
        isMainPanel: true,
        preferencesValue: [getStateData(this.props, 'personalPreferences.preferencesValue', 50)],
    };

    submitForm = data => {
        const { preferencesValue } = this.state;
        const additionalData = {
            preferencesValue: get(preferencesValue, '[0]', 0),
            status: getSectionStatus(data, FORM_FIELDS_NUMBER),
            dateCompleted: moment().format('DD-MMM-YYYY'),
        };
        const formData = Object.assign({}, data, additionalData);

        console.log('data', data );
        console.log('formData', formData );

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
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
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
                            <FormHelperText>Optional</FormHelperText>
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date Completed</FormLabel>
                            <Control.text
                                className={classes.formInput}
                                model="personalPreferences.dateCompleted"
                                defaultValue={filledValues.dateCompleted}
                                disabled
                            />
                        </FormGroup>
                        { !isVersionInfo && <SectionToolbar onRowClick={onRowClick} /> }
                    </LocalForm>
                </MainFormBlock>
                <SystemInformationBlock isMainPanel={isMainPanel} togglePanel={this.togglePanel} classes={classes} info={personalPreferences} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonalPreferences));
