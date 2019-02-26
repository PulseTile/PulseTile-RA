import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleForm, TextInput, DateInput, DisabledInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { personalPreferencesAction } from "../../../actions/ReSPECT/personalPreferencesAction";
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

class PersonalPreferences extends Component {

    state = {
        isMainPanel: true,
    };

    submitForm = data => {
        data.status = getSectionStatus(data, FORM_FIELDS_NUMBER);
        data.dateCompleted = moment().format('DD-MMM-YYYY');
        this.props.addPersonalPreferences(data);
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

                        <h4 align="center">PLACE FOR "How would you balance your priorities for care?"</h4>

                        <TextInput
                            rows="4"
                            source="preferencesText"
                            label="Considering the priorities above, what is more important to you?"
                            multiline
                            fullWidth
                        />
                        <Typography className={classes.textBelow}>
                            Optional
                        </Typography>
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
