import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { LocalForm, Control } from 'react-redux-form';
import { connect } from 'react-redux';
import { crudUpdate, crudCreate } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from "@material-ui/core/Typography";

import SectionToolbar from "../../../../core/common/Toolbars/CustomFormToolbar";
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
    parameterNewsScore: {
        width: '100%',
        height: 25,
        paddingTop: 5,
        paddingLeft: 10,
    },
    parameterNewsScoreSuccess: {
        width: '100%',
        height: 25,
        paddingTop: 5,
        paddingLeft: 10,
        backgroundColor: SUCCESS_COLOR,
    },
    parameterNewsScoreWarning: {
        width: '100%',
        height: 25,
        paddingTop: 5,
        paddingLeft: 10,
        backgroundColor: WARNING_COLOR,
    },
    parameterNewsScoreDanger: {
        width: '100%',
        height: 25,
        paddingTop: 5,
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
    switcherLabel: {
        marginLeft: 10,
    },
    switcherLabelActive: {
        marginLeft: 10,
        color: theme.palette.secondaryMainColor,
    }
});

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
        levelOfConsciousnessValue: null,
        anySupplementalOxygenClassName: 'anySupplementalOxygenBlock',
        anySupplementalOxygenValue: 'No',
        newsScoreClassName: 'newsScoreBlock',
        newsScoreValue: null,
        formInputNewsScore: 'formInput',
        parameterNewsScore: 'parameterNewsScore',
        respirationRate: null,
        oxygenSaturation: null,
        heartRate: null,
        systolicBP: null,
        diastolicBP: null,
        temperature: null,
    };

    submitForm = data => {
        const { isCreate, vitalsList, createNewVitals, updateVitals } = this.props;
        const { levelOfConsciousnessValue, anySupplementalOxygenValue, newsScoreValue } = this.state;
        const additionalData = {
            levelOfConsciousness: levelOfConsciousnessValue,
            oxygenSupplemental: (anySupplementalOxygenValue === 'Yes'),
            newsScore: newsScoreValue.toString(),
            dateCreate: moment().unix(),
            author: localStorage.getItem('username'),
            number: vitalsList.length + 1,
        };
        const formData = Object.assign({}, data, additionalData);
        if (isCreate) {
            createNewVitals(formData);
        } else {
            const filledValues = this.getCurrentItem();
            const id = get(filledValues, 'sourceId', null);
            const source = get(filledValues, 'source', null);
            formData.id = id;
            formData.source = source;
            updateVitals(id, formData, filledValues);
        }
    };

    changeLevelOfConsciousness = e => {
        const value = e.target.value;
        const className = (value !== 'Alert') ? 'levelConsciousnessBlockDanger' : 'levelConsciousnessBlock';
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
        const { isCreate, isDetailsPage } = this.props;
        const { anySupplementalOxygenValue, levelOfConsciousnessValue, respirationRate, oxygenSaturation, heartRate, systolicBP, temperature } = this.state;

        let newsScoreValue = 0;
        if (levelOfConsciousnessValue !== 'Alert' && levelOfConsciousnessValue) {
            newsScoreValue += 3;
        }
        if (anySupplementalOxygenValue === 'Yes') {
            newsScoreValue += 2;
        }

        newsScoreValue = newsScoreValue + respirationRate + oxygenSaturation + heartRate + systolicBP + temperature;

        let filledValues = isCreate ? null : this.getCurrentItem();
        const value = isDetailsPage ? get(filledValues, 'newsScore', null) : newsScoreValue;

        let newsScoreClassName = 'newsScoreBlock';
        let formInputNewsScore = 'formInputNewsScore';
        if (value > 6) {
            newsScoreClassName = 'newsScoreBlockDanger';
            formInputNewsScore = 'formInputNewsScoreDanger';
        } else if (value > 4) {
            newsScoreClassName = 'newsScoreBlockWarning';
            formInputNewsScore = 'formInputNewsScoreWarning';
        } else if (value > 0) {
            newsScoreClassName = 'newsScoreBlockSuccess';
            formInputNewsScore = 'formInputNewsScoreSuccess';
        }

        this.setState({
            newsScoreValue: newsScoreValue,
            newsScoreClassName: newsScoreClassName,
            formInputNewsScore: formInputNewsScore,
        });
    };

    updateInput = (name, value) => {
        this.setState({
            [name]: value,
        }, () => this.updateNewsScore())
    };

    getCurrentItem = () => {
        const { vitalsList, location } = this.props;
        const pathname = get(location, 'pathname', null);
        const pathnameArray = pathname.split('/');
        const sourceId = get(pathnameArray, [2], null);
        const vitalsListArray = Object.values(vitalsList);
        let result = null;
        for (let i = 0, n = vitalsListArray.length; i < n; i++) {
            let item = vitalsListArray[i];
            if (item.sourceId === sourceId || item.id === sourceId) {
                result = item;
                break;
            }
        }
        return result;
    };

    componentDidMount() {
        this.updateSwitchers();
    }

    componentWillReceiveProps(nextProps, props) {
        const newItemId = get(nextProps, 'id', null);
        const prevItemId = get(this.props, 'id', null);
        if (newItemId !== prevItemId) {
            this.updateSwitchers();
        }
    }

    updateSwitchers = () => {
        const filledValues = this.getCurrentItem();
        const levelOfConsciousness = get(filledValues, 'levelOfConsciousness', 'Alert' );
        const oxygenSupplemental = get(filledValues, 'oxygenSupplemental', false);
        this.setState({
            levelOfConsciousnessValue: levelOfConsciousness,
            anySupplementalOxygenValue: oxygenSupplemental ? 'Yes' : 'No',
            levelConsciousnessClassName: (levelOfConsciousness !== 'Alert') ? 'levelConsciousnessBlockDanger' : 'levelConsciousnessBlock',
            anySupplementalOxygenClassName: oxygenSupplemental ? 'anySupplementalOxygenBlockWarning' : 'anySupplementalOxygenBlock'
        });
    };

    getNewScoreDetailsColor = (filledValues) => {
        const newsScore = get(filledValues, 'newsScore', null);
        let result = '';
        if (newsScore > 6) {
            result = 'parameterNewsScoreDanger';
        } else if (newsScore > 4) {
            result = 'parameterNewsScoreWarning';
        } else if (newsScore > 0) {
            result = 'parameterNewsScoreSuccess';
        }
        return result;
    };

    render() {
        const { classes, isCreate, isDetailsPage } = this.props;
        const { levelConsciousnessClassName, levelOfConsciousnessValue, anySupplementalOxygenClassName, anySupplementalOxygenValue, newsScoreClassName, newsScoreValue, formInputNewsScore } = this.state;
        let filledValues = isCreate ? null : this.getCurrentItem();
        const sourceId = get(this.props, 'id', null);
        const parameterNewsScore = this.getNewScoreDetailsColor(filledValues);
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
                            value={get(filledValues, 'respirationRate', null)}
                            isDetailsPage={isDetailsPage}
                            sourceId={sourceId}
                        />
                        <ValueWithUnits
                            label="Oxygen Saturation"
                            units="%"
                            model="oxygenSaturation"
                            updateInput={this.updateInput}
                            hasPopup={true}
                            value={get(filledValues, 'oxygenSaturation', null)}
                            isDetailsPage={isDetailsPage}
                            sourceId={sourceId}
                        />
                    </div>

                    <FormControl className={classes.formControl}>
                        <div className={classes[anySupplementalOxygenClassName]}>
                            <FormLabel className={classes.formLabel}>Any Supplemental Oxygen</FormLabel>
                            <FormControlLabel
                                control={
                                    <CustomSwitch
                                        checked={(anySupplementalOxygenValue === 'Yes')}
                                        value={anySupplementalOxygenValue}
                                        onChange={() => this.changeAnySupplementalOxygen()}
                                        disabled={isDetailsPage}
                                    />
                                }
                                label={<Typography className={classes.switcherLabel}>{anySupplementalOxygenValue}</Typography>}
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
                            value={get(filledValues, 'heartRate', null)}
                            isDetailsPage={isDetailsPage}
                            sourceId={sourceId}
                        />
                        <ValueWithUnits
                            label="Temperature"
                            units="C"
                            model="temperature"
                            updateInput={this.updateInput}
                            hasPopup={true}
                            value={get(filledValues, 'temperature', null)}
                            isDetailsPage={isDetailsPage}
                            sourceId={sourceId}
                        />
                    </div>
                    <div>
                        <ValueWithUnits
                            label="Systolic BP"
                            units="mmHg"
                            model="systolicBP"
                            updateInput={this.updateInput}
                            hasPopup={true}
                            value={get(filledValues, 'systolicBP', null)}
                            isDetailsPage={isDetailsPage}
                            sourceId={sourceId}
                        />
                        <ValueWithUnits
                            label="Diastolic BP"
                            units="mmHg"
                            model="diastolicBP"
                            updateInput={this.updateInput}
                            hasPopup={false}
                            value={get(filledValues, 'diastolicBP', null)}
                            isDetailsPage={isDetailsPage}
                            sourceId={sourceId}
                        />
                    </div>

                    <FormControl className={classes.formControl}>
                        <div className={classes[levelConsciousnessClassName]}>
                            <FormLabel className={classes.formLabel}>Level of Consciousness</FormLabel>
                            <FormGroup aria-label="position" name="levelOfConsciousness" value={levelOfConsciousnessValue} onChange={e => this.changeLevelOfConsciousness(e)} row>
                                <FormControlLabel
                                    value="Alert"
                                    control={<CustomSwitch />}
                                    label={<Typography className={levelOfConsciousnessValue === 'Alert' ? classes.switcherLabelActive : classes.switcherLabel}>Alert</Typography>}
                                    labelPlacement="end"
                                    checked={levelOfConsciousnessValue === 'Alert'}
                                    disabled={isDetailsPage}
                                />
                                <FormControlLabel
                                    value="Voice"
                                    control={<CustomSwitch />}
                                    label={<Typography className={levelOfConsciousnessValue === 'Voice' ? classes.switcherLabelActive : classes.switcherLabel}>Voice</Typography>}
                                    labelPlacement="end"
                                    checked={levelOfConsciousnessValue === 'Voice'}
                                    disabled={isDetailsPage}
                                />
                                <FormControlLabel
                                    value="Pain"
                                    control={<CustomSwitch />}
                                    label={<Typography className={levelOfConsciousnessValue === 'Pain' ? classes.switcherLabelActive : classes.switcherLabel}>Pain</Typography>}
                                    labelPlacement="end"
                                    checked={levelOfConsciousnessValue === 'Pain'}
                                    disabled={isDetailsPage}
                                />
                                <FormControlLabel
                                    value="Unresponsive"
                                    control={<CustomSwitch />}
                                    label={<Typography className={levelOfConsciousnessValue === 'Unresponsive' ? classes.switcherLabelActive : classes.switcherLabel}>Unresponsive</Typography>}
                                    labelPlacement="end"
                                    checked={levelOfConsciousnessValue === 'Unresponsive'}
                                    disabled={isDetailsPage}
                                />
                            </FormGroup>
                        </div>
                    </FormControl>

                    <FormGroup className={classes.formGroup}>
                        <div className={classes[newsScoreClassName]}>
                            <FormLabel className={classes.formLabel}>NEWS Score</FormLabel>
                            {
                                isDetailsPage ?
                                    <div className={classes[parameterNewsScore]}>
                                        <Typography>{get(filledValues, 'newsScore', null)}</Typography>
                                    </div>
                                    :
                                    <Control.text
                                        className={classes[formInputNewsScore]}
                                        model='vitals.newsScore'
                                        value={newsScoreValue}
                                        disabled
                                    />
                            }

                        </div>
                    </FormGroup>

                    { !isDetailsPage && <SectionToolbar {...this.props} /> }

                </LocalForm>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        vitalsList: get(state, 'admin.resources.vitalsigns.data', []),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createNewVitals(formData) {
            dispatch(crudCreate('vitalsigns', formData, '/vitalsigns', '/vitalsigns'));
        },
        updateVitals(id, formData, filledValues) {
            dispatch(crudUpdate('vitalsigns', id, formData,  filledValues, '/vitalsigns', '/vitalsigns'));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VitalsInputs));
