import React, { Component } from "react";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { LocalForm, Control } from 'react-redux-form';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { vitalsAction } from "../../../actions/vitalsAction";
import SectionToolbar from "./SectionToolbar";
import ValueWithUnits from "./ValueWithUnits";
import CustomSwitch from "./CustomSwitch";
import { DANGER_COLOR, SUCCESS_COLOR, WARNING_COLOR } from "./settings";

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
    formInputNewsScore: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
    },
    formInputNewsScoreSuccess: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
        backgroundColor: SUCCESS_COLOR,
    },
    formInputNewsScoreWarning: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
        backgroundColor: WARNING_COLOR,
    },
    formInputNewsScoreDanger: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
        backgroundColor: DANGER_COLOR,
    },
    newsScoreBlock: {
        paddingLeft: 10,
        borderLeft: `2px solid ${theme.palette.borderColor}`
    },
    newsScoreBlockDanger: {
        paddingLeft: 10,
        borderLeft: `5px solid ${DANGER_COLOR}`
    },
    newsScoreBlockWarning: {
        paddingLeft: 10,
        borderLeft: `5px solid ${WARNING_COLOR}`
    },
    newsScoreBlockSuccess: {
        paddingLeft: 10,
        borderLeft: `5px solid ${SUCCESS_COLOR}`
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
    text: {
        padding: 20,
    },
    levelConsciousnessBlock: {
        width: '100%',
        paddingLeft: 10,
        margin: 20,
        borderLeft: `2px solid ${theme.palette.borderColor}`
    },
    levelConsciousnessBlockDanger: {
        width: '100%',
        paddingLeft: 10,
        margin: 20,
        borderLeft: `5px solid ${DANGER_COLOR}`
    },
    anySupplementalOxygenBlock: {
        width: '100%',
        paddingLeft: 10,
        margin: 20,
        borderLeft: `2px solid ${theme.palette.borderColor}`
    },
    anySupplementalOxygenBlockWarning: {
        width: '100%',
        paddingLeft: 10,
        margin: 20,
        borderLeft: `5px solid ${WARNING_COLOR}`
    },
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

    state = {
        levelConsciousnessClassName: 'levelConsciousnessBlock',
        levelOfConsciousnessValue: 'A',
        anySupplementalOxygenClassName: 'anySupplementalOxygenBlock',
        anySupplementalOxygenValue: 'No',
        newsScoreClassName: 'newsScoreBlock',
        newsScoreValue: null,
        formInputNewsScore: 'formInput',
        respirationRate: null,
        oxygenSaturation: null,
        heartRate: null,
        systolicBP: null,
        diastolicBP: null,
        temperature: null,
    };

    submitForm = data => {
        const { createNewItem } = this.props;
        const { levelOfConsciousnessValue, anySupplementalOxygenValue, newsScoreValue } = this.state;
        const additionalData = {
            levelOfConsciousness: levelOfConsciousnessValue,
            oxygenSupplemental: (anySupplementalOxygenValue === 'Yes'),
            newsScore: newsScoreValue.toString(),
            dateCreate: moment().unix(),
            author: localStorage.getItem('username')
        };
        const formData = Object.assign({}, data, additionalData);
        createNewItem(formData);
    };

    changeLevelOfConsciousness = e => {
        const value = e.target.value;
        const className = (value !== 'A') ? 'levelConsciousnessBlockDanger' : 'levelConsciousnessBlock';
        this.setState({
            levelOfConsciousnessValue: value,
            levelConsciousnessClassName: className,
        }, () => this.updateNewsScore());
    };

    changeAnySupplementalOxygen = () => {
        const newValue = (this.state.anySupplementalOxygenValue === 'Yes') ? 'No' : 'Yes';
        const className = (newValue === 'Yes') ? 'anySupplementalOxygenBlockWarning' : 'anySupplementalOxygenBlock';
        this.setState({
            anySupplementalOxygenValue: newValue,
            anySupplementalOxygenClassName: className,
        }, () => this.updateNewsScore());
    };

    updateNewsScore = () => {
        const { anySupplementalOxygenValue, levelOfConsciousnessValue, respirationRate, oxygenSaturation, heartRate, systolicBP, temperature } = this.state;

        let newsScoreValue = 0;
        if (levelOfConsciousnessValue !== 'A') {
            newsScoreValue += 3;
        }
        if (anySupplementalOxygenValue === 'Yes') {
            newsScoreValue += 2;
        }

        newsScoreValue = newsScoreValue + respirationRate + oxygenSaturation + heartRate + systolicBP + temperature;

        let newsScoreClassName = 'newsScoreBlock';
        let formInputNewsScore = 'formInputNewsScore';
        if (newsScoreValue > 6) {
            newsScoreClassName = 'newsScoreBlockDanger';
            formInputNewsScore = 'formInputNewsScoreDanger';
        } else if (newsScoreValue > 4) {
            newsScoreClassName = 'newsScoreBlockWarning';
            formInputNewsScore = 'formInputNewsScoreWarning';
        } else if (newsScoreValue > 0) {
            newsScoreClassName = 'newsScoreBlockSuccess';
            formInputNewsScore = 'formInputNewsScoreSuccess';
        }

        this.setState({
            newsScoreValue: newsScoreValue,
            newsScoreClassName: newsScoreClassName,
            formInputNewsScore: formInputNewsScore
        });
    };

    updateInput = (name, value) => {
        this.setState({
            [name]: value,
        }, () => this.updateNewsScore())
    };

    render() {
        const { classes } = this.props;
        const { levelConsciousnessClassName, levelOfConsciousnessValue, anySupplementalOxygenClassName, anySupplementalOxygenValue, newsScoreClassName, newsScoreValue, formInputNewsScore } = this.state;
        return (
            <React.Fragment>
                <LocalForm model="vitals" onSubmit={values => this.submitForm(values)}>

                    <div>
                        <ValueWithUnits
                            label="Respiration Rate"
                            units="resps/min"
                            model="respirationRate"
                            updateInput={this.updateInput}
                            hasPopup={true}
                        />
                        <ValueWithUnits
                            label="Oxygen Saturation"
                            units="%"
                            model="oxygenSaturation"
                            updateInput={this.updateInput}
                            hasPopup={true}
                        />
                    </div>

                    <FormControl className={classes.formControl}>
                        <div className={classes[anySupplementalOxygenClassName]}>
                            <FormLabel className={classes.formLabel}>Any Supplemental Oxygen</FormLabel>
                            <FormControlLabel
                                control={
                                    <CustomSwitch
                                        checked={anySupplementalOxygenValue === 'Yes'}
                                        value={anySupplementalOxygenValue}
                                        onChange={() => this.changeAnySupplementalOxygen()}
                                    />
                                }
                                label={anySupplementalOxygenValue}
                            />
                        </div>
                    </FormControl>

                    <div>
                        <ValueWithUnits
                            label="Heart Rate"
                            units="bpm"
                            model="heartRate"
                            updateInput={this.updateInput}
                            hasPopup={true}
                        />
                        <ValueWithUnits
                            label="Systolic BP"
                            units="mmHg"
                            model="systolicBP"
                            updateInput={this.updateInput}
                            hasPopup={true}
                        />
                    </div>

                    <ValueWithUnits
                        label="Diastolic BP"
                        units="mmHg"
                        model="diastolicBP"
                        updateInput={this.updateInput}
                        hasPopup={false}
                    />

                    <ValueWithUnits
                        label="Temperature"
                        units="C"
                        model="temperature"
                        updateInput={this.updateInput}
                        hasPopup={true}
                    />

                    <FormControl className={classes.formControl}>
                        <div className={classes[levelConsciousnessClassName]}>
                            <FormLabel className={classes.formLabel}>Level of Consciousness</FormLabel>
                            <FormGroup aria-label="position" name="levelOfConsciousness" value={levelOfConsciousnessValue} onChange={e => this.changeLevelOfConsciousness(e)} row>
                                <FormControlLabel
                                    value="A"
                                    control={<CustomSwitch />}
                                    label="A"
                                    labelPlacement="end"
                                    checked={levelOfConsciousnessValue === 'A'}
                                />
                                <FormControlLabel
                                    value="V"
                                    control={<CustomSwitch />}
                                    label="V"
                                    labelPlacement="end"
                                    checked={levelOfConsciousnessValue === 'V'}
                                />
                                <FormControlLabel
                                    value="P"
                                    control={<CustomSwitch />}
                                    label="P"
                                    labelPlacement="end"
                                    checked={levelOfConsciousnessValue === 'P'}
                                />
                                <FormControlLabel
                                    value="U"
                                    control={<CustomSwitch />}
                                    label="U"
                                    labelPlacement="end"
                                    checked={levelOfConsciousnessValue === 'U'}
                                />
                            </FormGroup>
                        </div>
                    </FormControl>

                    <FormGroup className={classes.formGroup}>
                        <div className={classes[newsScoreClassName]}>
                            <FormLabel className={classes.formLabel}>NEWS Score</FormLabel>
                            <Control.text
                                className={classes[formInputNewsScore]}
                                model='vitals.newsScore'
                                value={newsScoreValue}
                                disabled
                            />
                        </div>
                    </FormGroup>

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
