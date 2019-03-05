import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleForm, TextInput, DateInput, DisabledInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

import { summaryInformationAction } from "../../../actions/ReSPECT/summaryInformationAction";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { TOTAL_ROWS_NUMBER } from "../statuses";
import { getSectionStatus } from "../functions";

const FORM_FIELDS_NUMBER = 2;

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
};

const styles = {
    textBelow: {
        width: "auto",
    }
};

class SummaryInformation extends Component {

    state = {
        isMainPanel: true,
    };

    submitForm = data => {
        data.status = getSectionStatus(data, FORM_FIELDS_NUMBER);
        data.dateCompleted = moment().format('DD-MMM-YYYY');
        this.props.addSummaryInformation(data);
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
                        <TextInput
                            rows="4"
                            source="summary"
                            label="Summary of relevant information for this plan."
                            multiline
                            fullWidth
                        />
                        <FormHelperText className={classes.textBelow}>
                            Including diagnosis, communication needs (e.g. interpreter, communication aids) and reasons for the preferences and recomendations recorder.
                        </FormHelperText>
                        <TextInput
                            rows="4"
                            source="details"
                            label="Details of other relevant planning documents"
                            multiline
                            fullWidth
                        />
                        <FormHelperText className={classes.textBelow}>
                            Details of other relevant planning documents and where to find them (e.g. Advance Decision to Refuse Treatment, Advance Care Plan).
                            Also include known wishes about organ donation.
                        </FormHelperText>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SummaryInformation));


