import React, { Component } from 'react';
import get from "lodash/get";
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
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import RadioButtonWithLink from "../fragments/RadioButtonWithLink";
import { TOTAL_ROWS_NUMBER } from "../statuses";
import { getSectionStatus, getFilledValues } from "../functions";

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



class CapacityAndRepresentation extends Component {

    state = {
        isMainPanel: true,
        capacityFirst: this.props.isVersionInfo
            ? get(this.props, 'sectionsInfo.capacityAndRepresentation.capacityFirst', null)
            : get(this.props, 'capacityAndRepresentation.capacityFirst', null),
        capacitySecond: this.props.isVersionInfo
            ? get(this.props, 'sectionsInfo.capacityAndRepresentation.capacitySecond', null)
            : get(this.props, 'capacityAndRepresentation.capacitySecond', null),
    };

    submitForm = data => {
        const { capacityFirst, capacitySecond } = this.state;
        const additionalData = {
            capacityFirst: capacityFirst,
            capacitySecond: capacitySecond,
            dateCompleted: moment().format('DD-MMM-YYYY'),
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

    handleChecking = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    render() {
        const { classes, sectionsInfo, capacityAndRepresentation, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel, capacityFirst, capacitySecond } = this.state;
        const filledValues = getFilledValues(sectionsInfo, capacityAndRepresentation, 'capacityAndRepresentation', isVersionInfo, defaultValues);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <LocalForm  model="personalDetails" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Does the person have sufficient capacity to participate in making the recommendations on this plan?</FormLabel>
                            <RadioGroup name="capacityFirst" className={classes.radioGroup} value={capacityFirst} onChange={e => this.handleChecking(e)}>
                                <FormControlLabel
                                    value="1"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="2"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label="No"
                                />
                            </RadioGroup>
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Do that have legal proxy (e.g. welfare attourney, person with parental responsibility who can participate on their behalf in making recommendations?</FormLabel>
                            <RadioGroup name="capacitySecond" className={classes.radioGroup} value={capacitySecond} onChange={e => this.handleChecking(e)}>
                                <FormControlLabel
                                    value="1"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label={<RadioButtonWithLink onRowClick={onRowClick} />}
                                />
                                <FormControlLabel
                                    value="2"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label="No"
                                />
                                <FormControlLabel
                                    value="3"
                                    disabled={isVersionInfo}
                                    control={<Radio />}
                                    label="Unknown"
                                />
                            </RadioGroup>
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date Completed</FormLabel>
                            <Control.text className={classes.formInput} model="personalDetails.dateCompleted" defaultValue={filledValues.dateCompleted} disabled />
                        </FormGroup>
                        { !isVersionInfo && <SectionToolbar onRowClick={onRowClick} /> }
                    </LocalForm>
                </MainFormBlock>
                <SystemInformationBlock isMainPanel={isMainPanel} togglePanel={this.togglePanel} classes={classes} info={capacityAndRepresentation} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CapacityAndRepresentation));
