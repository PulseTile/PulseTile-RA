import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleForm, TextInput, DateInput, DisabledInput, RadioButtonGroupInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { clinicalRecommendationsAction } from "../../../actions/ReSPECT/clinicalRecommendationsAction";
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

const cprChoices = [
    { id: '1', name: 'CPR attempts recommended (Adult or child)' },
    { id: '2', name: 'For modified CPR (Adult or child)' },
    { id: '3', name: 'CPR attempts NOT recommended (Adult or child)' },
];

class ClinicalRecomandations extends Component {

    state = {
        isMainPanel: true,
        cprValue: null,
    };

    submitForm = data => {
        data.status = getSectionStatus(data, FORM_FIELDS_NUMBER);
        data.dateCompleted = moment().format('DD-MMM-YYYY');
        this.props.addClinicalRecommendations(data);
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

                        <h4 align="center">PLACE FOR "Clinical recomendations for emergency care and treatment"</h4>
                        <hr />
                        <h4 align="center">PLACE FOR "Clinical signature"</h4>

                        <TextInput
                            rows="6"
                            source="clinicalGuidance"
                            label="Clinical Guidance"
                            multiline
                            fullWidth
                        />
                        <Typography className={classes.textBelow}>
                            Now provide clinical guidance on specific inverventions that may or may not be wanted or clinicaly appropriate,
                            includingbeing taken or admitted to hospital +/- receiving life support
                        </Typography>

                        <RadioButtonGroupInput source="cprValue" label="CPR recommendation" choices={cprChoices} />

                        <h4 align="center">PLACE FOR "Clinical signature"</h4>

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
        addClinicalRecommendations(data) {
            dispatch(clinicalRecommendationsAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClinicalRecomandations));
