import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleForm, DisabledInput, RadioButtonGroupInput, TextInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { involvementAction } from "../../../actions/ReSPECT/involvenentAction";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import InsertedRadioButtonGroup from "../fragments/InsertedRadioButtonGroup";
import { TOTAL_ROWS_NUMBER } from "../statuses";
import { getSectionStatus } from "../functions";

const FORM_FIELDS_NUMBER = 4;

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
};

const styles = {
    textBelow: {
        width: "auto",
        marginBottom: 15,
    },
    radioButtonGroup: {
        width: "auto",
    },
    helperText: {
        marginLeft: 35,
        marginTop: 0,
    },
    titleBlock: {
        width: '100%',
    },
};

class Involvement extends Component {

    state = {
        isMainPanel: true,
        selectedValue: null,
    };

    submitForm = data => {
        data.status = getSectionStatus(data, FORM_FIELDS_NUMBER);
        data.dateCompleted = moment().format('DD-MMM-YYYY');
        this.props.addInvolvement(data);
        const nextStep = (this.props.currentRow > TOTAL_ROWS_NUMBER) ? null : (this.props.currentRow + 1);
        this.props.onRowClick(nextStep);
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    handleChange = event => {
        this.setState({ selectedValue: event.target.value });
    };

    render() {
        const { classes, personalDetails, title, onRowClick } = this.props;
        const { isMainPanel, selectedValue } = this.state;
        const filledValues = Object.assign({}, defaultValues, personalDetails);
        const InsertRadioValues = ['4', '5', '6'];
        const insertedChoices = [
            { id: '4', name: '1 - They have sufficient maturity and understanding to participate in making this plan.' },
            { id: '5', name: '2 - They do not have sufficient maturity and understanding to participate in making this plan. Their views, when known, have been taken into account.' },
            { id: '6', name: '3 - Those holding parental responsibility have been fully involved in discussing and making this plan.' },
        ];
        const mainChoices = [
            { id: '1', name: 'A - This person has the mantal capacity to participate in making these recommendations. They have benn fully involved in making this plan.' },
            { id: '2', name: 'B - This person does not have the mental capacity to participate in making these recommendations. This plan has been made in accordance with capacity law, including, where applicable, in consultation with their legal proxy, or where no proxy, with relevant family members / friends.'},
            { id: '3', name:
                <InsertedRadioButtonGroup
                    isSelected={selectedValue === '3' || InsertRadioValues.indexOf(selectedValue) !== -1}
                    label="C - This person is less than 18 (UK Except Scotland) / 16 (Scotland)"
                    secondaryLabel="Please select 1 or 2, and also 3 as applicable or explain in section D below"
                    sourceName="involvementValue"
                    choices={insertedChoices}
                />},
        ];
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <SimpleForm save={e => this.submitForm(e)} defaultValue={filledValues} toolbar={<SectionToolbar onRowClick={onRowClick} />}>
                        <FormLabel>The clinician(s) signing this plan is / are confirming that</FormLabel>
                        <RadioButtonGroupInput
                            source="involvementValue"
                            label="Select A, B or C, OR complete section D below:"
                            choices={mainChoices}
                            onClick={e => this.handleChange(e)}
                            fullWidth
                        />

                        <div className={classes.titleBlock}>
                            <TextInput
                                label="D - if no other option has been selected, valid reasons must be stated here"
                                rows="6"
                                source="variantD"
                                multiline
                                fullWidth
                            />
                            <FormHelperText>Document full explanation in the clinical record</FormHelperText>
                        </div>

                        <div className={classes.titleBlock}>
                            <TextInput
                                label="Record date, names and roles of those involved in decision making, and where records of discussion can be found"
                                rows="6"
                                source="records"
                                multiline
                                fullWidth
                            />
                        </div>

                        <DisabledInput className={classes.labelBlock} source="dateCompleted" label="Date Completed" />
                    </SimpleForm>
                </MainFormBlock>
                <SystemInformationBlock isMainPanel={isMainPanel} togglePanel={this.togglePanel} classes={classes} info={personalDetails} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Involvement));
