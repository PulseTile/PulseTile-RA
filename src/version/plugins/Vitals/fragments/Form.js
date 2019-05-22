import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalForm, Control } from 'react-redux-form';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import { vitalsAction } from "../../../actions/vitalsAction";
import SectionToolbar from "../../TransferOfCare/fragments/SectionToolbar";
import ValueWithUnits from "./ValueWithUnits";

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
        marginBottom: 15,
    },
    valueAndUnits: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start"
    },
    formInput: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
    },
    formInputUnits: {
        width: '50%',
        height: 25,
        paddingLeft: 10,
    },
    units: {
        width: '50%',
        height: 25,
        paddingTop: 5,
        paddingLeft: 10,
        borderTop: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
    formSelect: {
        width: '100%',
        height: 30,
        paddingLeft: 10,
        backgroundColor: "#fff",
    },
    formTextarea: {
        width: '98%',
        height: 180,
        padding: 10,
    },
    text: {
        padding: 20,
    }
});

const patientID = localStorage.getItem('patientId') ? localStorage.getItem('patientId') : localStorage.getItem('userId');

/**
 * This component returns TransferOfCare creation/editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  classes
 * @param {string} modelName
 */
class VitalsInputs extends Component {

    state = {};

    changeDate = value => {
        this.setState({
            transferDateTime: value,
        });
    };

    submitForm = data => {
        const { createNewItem } = this.props;
        const { transferDateTime, recordsArray } = this.state;
        const additionalData = {
            transferDateTime: moment(transferDateTime).unix(),
            records: recordsArray,
            userId: patientID,
        };
        const formData = Object.assign({}, data, additionalData);
        createNewItem(formData);
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <LocalForm model="vitals" onSubmit={values => this.submitForm(values)}>

                    <ValueWithUnits
                        label="Respiration Rate"
                        units="resps/min"
                        model="respirationRate"
                    />

                    <ValueWithUnits
                        label="Oxygen Saturation"
                        units="%"
                        model="oxygenSaturation"
                    />

                    <ValueWithUnits
                        label="Heart Rate"
                        units="bpm"
                        model="heartRate"
                    />

                    <ValueWithUnits
                        label="Systolic BP"
                        units="mmHg"
                        model="systolicBP"
                    />

                    <ValueWithUnits
                        label="Diastolic BP"
                        units="mmHg"
                        model="diastolicBP"
                    />

                    <ValueWithUnits
                        label="Temperature"
                        units="C"
                        model="temperature"
                    />

                    {/*<ValueWithUnits*/}
                    {/*    label="NEWS Score"*/}
                    {/*    units={false}*/}
                    {/*    model="newsScore"*/}
                    {/*/>*/}

                    <SectionToolbar {...this.props} />

                </LocalForm>
            </React.Fragment>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createNewItem(data) {
            dispatch(vitalsAction.create(data));
        },
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(VitalsInputs));
