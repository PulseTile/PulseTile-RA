import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";

import patientPhoto from "../../../images/randomPatient.png";
import PieChartBlock from "./PieChartBlock";
import HorizontalBarChart from "./HorizontalBarChart";

const styles = {
    patientPhoto: {
        height: 110,
        width: 110,
        borderRadius: '50%'
    },
    ageAndHeight: {
        paddingLeft: 20,
    },
    parameter: {
        display: 'flex',
        flexDirection: 'row',
    },
    value: {
        paddingTop: 2,
        paddingLeft: 5,
    },
    diagrams: {
        display: 'flex',
        flexDirection: 'column',
    },
    horizontalBarChart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
    },
    chartBlock: {
        width: '90%',
        height: 80,
        textAlign: 'center',
        paddingTop: 10,
    },
};

const COLOR_AMBER = '#ffac5a';
const COLOR_GREEN = '#2dcd0d';
const COLOR_YELLOW = '#fbf800';
const COLOR_RED = '#ff5d00';

const DIAGNOSIS_AMBER = 'Overweight';
const DIAGNOSIS_GREEN = 'Healthy Weight';
const DIAGNOSIS_YELLOW = 'Underweight';
const DIAGNOSIS_RED = 'Obese';


const OXYGEN_SATURATION_HARDCODE = 91;
const SYSTOLIC_PRESSURE_HARDCODE = 150;
const DIASTOLIC_PRESSURE_HARDCODE = 88;

class PhotoAndVitals extends Component {

    getPatientAge = () => {
        const { patientInfo } = this.props;
        const birthDate = get(patientInfo, 'birthDate', null);
        const birthDateArray = birthDate ? birthDate.split('-') : [];
        const year = get(birthDateArray, [0], null);
        const currentYear = new Date().getFullYear();
        return currentYear - year;
    };

    getWeightResult = value => {
        let result = {
            color: COLOR_YELLOW,
            diagnosis: DIAGNOSIS_YELLOW,
        };
        if (value > 18.5 && value < 24.9) {
            result = {
                color: COLOR_GREEN,
                diagnosis: DIAGNOSIS_GREEN,
            };
        } else if (value > 25 && value < 29.9) {
            result = {
                color: COLOR_AMBER,
                diagnosis: DIAGNOSIS_AMBER,
            };
        } else if (value > 30) {
            result = {
                color: COLOR_RED,
                diagnosis: DIAGNOSIS_RED,
            };
        }
        return result;
    };

    getOxygenSaturationResult = value => {
        let result = {
            color: COLOR_YELLOW,
            diagnosis: DIAGNOSIS_YELLOW,
        };
        if (value > 92 && value < 95) {
            result = {
                color: COLOR_GREEN,
                diagnosis: DIAGNOSIS_GREEN,
            };
        } else if (value < 91 || value > 96) {
            result = {
                color: COLOR_RED,
                diagnosis: DIAGNOSIS_RED,
            };
        }
        return result;
    };

    getSystolicColor = value => {
        let result = COLOR_YELLOW;
        if (value > 101 && value < 219) {
            result = COLOR_GREEN;
        } else if (value < 90 || value > 220) {
            result = COLOR_RED;
        }
        return result;
    };

    getDiastolicColor = value => {
        let result = COLOR_YELLOW;
        if (value > 101 && value < 219) {
            result = COLOR_GREEN;
        } else if (value < 90 || value > 220) {
            result = COLOR_RED;
        }
        return result;
    };

    render() {
        const { classes, patientInfo, isLoadingPhoto, isLoading } = this.props;
        const age = this.getPatientAge();

        const weight = 87.5;
        const bmi = 17.92;

        const weightResult = this.getWeightResult(bmi);

        const oxygenSaturationResult = this.getOxygenSaturationResult(OXYGEN_SATURATION_HARDCODE);

        const systolicColor = this.getSystolicColor(SYSTOLIC_PRESSURE_HARDCODE);
        const diastolicColor = this.getDiastolicColor(DIASTOLIC_PRESSURE_HARDCODE);

        const patientName = `${get(patientInfo, 'firstName', null)} ${get(patientInfo, 'lastName', null)}`;
        return (
            <React.Fragment>
                <div className={classes.blockTitle}>
                    <Typography className={classes.title}>{patientName}</Typography>
                </div>
                <Grid container xs={12} className={classes.content}>
                    <Grid item xs={12} sm={6} md={5} className={classes.photoAndVitals}>
                        <Grid container xs={12} className={classes.insideGridBlock}>
                            <Grid item xs={12} sm={6} md={3}>
                                <CardMedia
                                    className={classes.patientPhoto}
                                    component="img"
                                    alt={patientName}
                                    image={patientPhoto}
                                    title={patientName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={9} className={classes.ageAndHeight}>
                                <div className={classes.parameter}>
                                    <Typography variant="body2">Age: </Typography>
                                    <Typography className={classes.value}>{isLoading ? 'Loading...' : age}</Typography>
                                </div>
                                <div className={classes.parameter}>
                                    <Typography variant="body2" >Height: </Typography>
                                    <Typography className={classes.value}>184 cm</Typography>
                                </div>
                                <div className={classes.parameter}>
                                    <Typography variant="body2" >CPR Status: </Typography>
                                    <Typography className={classes.value}>For active CPR</Typography>
                                </div>
                                <div className={classes.parameter}>
                                    <Typography variant="body2" >Blood Group: </Typography>
                                    <Typography className={classes.value}>O+</Typography>
                                </div>
                                <div className={classes.parameter}>
                                    <Typography variant="body2" >Donor status: </Typography>
                                    <Typography className={classes.value}>Organ Donor</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={7}>
                        <div className={classes.diagrams}>
                            <Grid container xs={12}>
                                <Grid item xs={12} sm={12} md={4}>
                                    <PieChartBlock
                                        title="Weight"
                                        value={weight}
                                        units="kg"
                                        color={weightResult.color}
                                        maximal={150}
                                        diagnosis={weightResult.diagnosis}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <PieChartBlock
                                        title="BMI"
                                        value={bmi}
                                        units="kg/m2"
                                        color={weightResult.color}
                                        maximal={50}
                                        diagnosis={weightResult.diagnosis}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <PieChartBlock
                                        title="Oxygen Saturation"
                                        value={OXYGEN_SATURATION_HARDCODE}
                                        units="%"
                                        color={oxygenSaturationResult.color}
                                        maximal={100}
                                        diagnosis={oxygenSaturationResult.diagnosis}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container xs={12}>
                                <Grid item xs={12} sm={12} md={4}>
                                    <div className={classes.horizontalBarChart}>
                                        <Typography variant="body2">Blood pressure: 143 / 89</Typography>
                                        <Typography variant="body1" className={classes.value}>kg/m2</Typography>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={4}>
                                    <div className={classes.chartBlock}>
                                        <HorizontalBarChart title="Systolic" value={SYSTOLIC_PRESSURE_HARDCODE} color={systolicColor} maximal={220} />
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={4}>
                                    <div className={classes.chartBlock}>
                                        <HorizontalBarChart title="Diastolic" value={DIASTOLIC_PRESSURE_HARDCODE} color={diastolicColor} maximal={220} />
                                    </div>
                                </Grid>


                            </Grid>
                        </div>
                    </Grid>
                </Grid>

            </React.Fragment>
        );
    }

};

const mapStateToProps = state => {
    return {
        patientInfo: get(state, 'custom.currentPatient.patientInfo.data', null),
        isLoading: get(state, 'custom.currentPatient.loading', null),
        patientPhoto: get(state, 'custom.currentPatient.patientPhoto', null),
        isLoadingPhoto: get(state, 'custom.currentPatient.loadingPhoto', null),
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(PhotoAndVitals));