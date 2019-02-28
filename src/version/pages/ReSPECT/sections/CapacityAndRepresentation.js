import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleForm, DisabledInput, RadioButtonGroupInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';

import { capacityAndRepresentationAction } from "../../../actions/ReSPECT/capacityAndRepresentationAction";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { TOTAL_ROWS_NUMBER } from "../statuses";
import { getSectionStatus } from "../functions";

const FORM_FIELDS_NUMBER = 5;

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
    }
};

const capacityFirstChoices = [
    { id: '1', name: 'Yes' },
    { id: '2', name: 'No' },
];

const capacitySecondChoices = [
    { id: '1', name: 'Yes (if so, document details in emergency contact section)' },
    { id: '2', name: 'No' },
    { id: '3', name: 'Unknown' },
];

class CapacityAndRepresentation extends Component {

    state = {
        isMainPanel: true,
        capacityFirst: null,
        capacitySecond: null,
    };

    submitForm = data => {
        data.status = getSectionStatus(data, FORM_FIELDS_NUMBER);
        data.dateCompleted = moment().format('DD-MMM-YYYY');
        this.props.addCapacityAndRepresentation(data);
        const nextStep = (this.props.currentRow > TOTAL_ROWS_NUMBER) ? null : (this.props.currentRow + 1);
        this.props.onRowClick(nextStep);
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    render() {
        const { classes, personalDetails, title, onRowClick } = this.props;
        const { isMainPanel } = this.state;
        const filledValues = Object.assign({}, defaultValues, personalDetails);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <SimpleForm save={e => this.submitForm(e)} defaultValue={filledValues} toolbar={<SectionToolbar onRowClick={onRowClick} />}>
                        <RadioButtonGroupInput
                            source="capacityFirst"
                            label="Does the person have sufficient capacity to participate in making the recommendations on this plan?"
                            choices={capacityFirstChoices}
                            fullWidth
                        />
                        <RadioButtonGroupInput
                            source="capacitySecond"
                            label="Do that have legal proxy (e.g. welfare attourney, person with parental responsibility who can participate on their behalf in making recommendations?"
                            choices={capacitySecondChoices}
                            fullWidth
                        />
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
