import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { capacityAndRepresentationAction } from "../../../actions/ReSPECT/capacityAndRepresentationAction";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import RadioButtonWithLink from "../fragments/RadioButtonWithLink";
import { TOTAL_ROWS_NUMBER, DATE_FORMAT } from "../statuses";
import { getSectionStatus, getFilledValues, getStateData } from "../functions";
import formStyles from "../fragments/formStyles";

const FORM_FIELDS_NUMBER = 2;

const defaultValues = {
    author: localStorage.getItem('username'),
};

class CapacityAndRepresentation extends Component {

    state = {
        isMainPanel: true,
        capacityFirst: getStateData(this.props, 'capacityAndRepresentation.capacityFirst'),
        legalProxyValue: getStateData(this.props, 'capacityAndRepresentation.legalProxyValue'),
    };

    submitForm = data => {
        const { capacityFirst, legalProxyValue } = this.state;
        const additionalData = {
            capacityFirst: capacityFirst,
            legalProxyValue: legalProxyValue,
            dateCompleted: moment().format(DATE_FORMAT),
        };
        const formData = Object.assign({}, data, additionalData);
        formData.status = getSectionStatus(formData, FORM_FIELDS_NUMBER);
        this.props.addCapacityAndRepresentation(formData);
        const nextStep = (this.props.currentRow > TOTAL_ROWS_NUMBER) ? null : (this.props.currentRow + 1);
        this.props.onRowClick(nextStep);
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    handleCheckingBoolean = e => {
        this.setState({
            [e.target.name]: (e.target.value === 'true'),
        })
    };

    handleChecking = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    render() {
        const { classes, sectionsInfo, latestVersionInfo, capacityAndRepresentation, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel, capacityFirst, legalProxyValue } = this.state;
        const filledValues = getFilledValues(sectionsInfo, latestVersionInfo, capacityAndRepresentation, 'capacityAndRepresentation', isVersionInfo, defaultValues);
        return (
            <React.Fragment>
                <MainFormBlock isVersionInfo={isVersionInfo} isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <LocalForm  model="capacityAndRepresentation" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Does the person have sufficient capacity to participate in making the recommendations on this plan?</FormLabel>
                            <RadioGroup name="capacityFirst" className={classes.radioGroup} value={String(capacityFirst)} onChange={e => this.handleCheckingBoolean(e)}>
                                <FormControlLabel
                                    value="true"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="false"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label="No"
                                />
                            </RadioGroup>
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Do they have legal proxy (e.g. welfare attorney, person with parental responsibility who can participate on their behalf in making recommendations?</FormLabel>
                            <RadioGroup name="legalProxyValue" className={classes.radioGroup} value={legalProxyValue} onChange={e => this.handleChecking(e)}>
                                <FormControlLabel
                                    value="Yes"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label={<RadioButtonWithLink onRowClick={onRowClick} />}
                                />
                                <FormControlLabel
                                    value="No"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label="No"
                                />
                                <FormControlLabel
                                    value="Unknown"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label="Unknown"
                                />
                            </RadioGroup>
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
        capacityAndRepresentation: state.custom.capacityAndRepresentation.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addCapacityAndRepresentation(data) {
            dispatch(capacityAndRepresentationAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(CapacityAndRepresentation));
