import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { businessIntelligenceAction } from "../../../actions/BusinessIntelligence/businessIntelligenceAction";
import { genderArray, diagnosisArray } from "../constants";
import RangeLine from "../fragments/RangeLine";
import HealthScoreAxis from "../fragments/HealthScoreAxis";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    currentTabContainer: {
        width: "100%",
        backgroundColor: theme.palette.paperColor,
        margin: 0,
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
    },
    formLabel: {
        display: "block",
        [theme.breakpoints.only('xs')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '20%',
        },
        fontWeight: 800,
        color: theme.palette.fontColor,
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 5,
    },
    dialogLabel: {
        display: "inline-block",
        minWidth: '20%',
        marginTop: 10,
    },
    checkbox: {
        display: "inline-block",
        height: 24,
    },
    checkboxLabel: {
        display: "inline-block",
    },
    customCheckbox: {
        '&$checked': {
            color: theme.palette.mainColor,
        }
    },
    checked: {},
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    updateButton: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: theme.palette.secondaryMainColor,
        backgroundColor: theme.palette.paperColor,
        border: `1px solid ${theme.palette.secondaryMainColor}`,
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            backgroundColor: theme.palette.secondaryMainColor,
            color: theme.palette.paperColor,
        },
    },
    resetButton: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: theme.palette.dangerColor,
        backgroundColor: theme.palette.paperColor,
        border: `1px solid ${theme.palette.dangerColor}`,
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            backgroundColor: theme.palette.dangerColor,
            color: theme.palette.paperColor,
        },
    },
    filterIcon: {
        marginLeft: 5,
    }
});

class BusinessIntelligenceForm extends Component {

    state = {
        age: [0, 100],
        healthScore: [0, 100],
        gender: [],
        diagnosis: [],
    };

    componentDidMount() {
        this.setInitialValues();
    }

    setInitialValues = () => {
        let genders = [];
        let diagnosis = [];
        for (let i = 0, n = genderArray.length; i < n; i++) {
            let genderItem = genderArray[i];
            genders.push(genderItem.type);
        }
        for (let i = 0, n = diagnosisArray.length; i < n; i++) {
            let diagnosisItem = diagnosisArray[i];
            diagnosis.push(diagnosisItem.type);
        }
        this.setState({
            gender: genders,
            diagnosis: diagnosis,
        })
    };

    resetForm = () => {
        const { resetBusinessIntelligence } = this.props;
        this.setState(state => ({
            age: [0, 100],
            healthScore: [0, 100],
        }), () => {
            this.setInitialValues();
            resetBusinessIntelligence();
        });
    };

    isGenderChecked = item => {
        const { gender } = this.state;
        return gender.indexOf(item) !== -1;
    };

    isDiagnosisChecked = item => {
        const { diagnosis } = this.state;
        return diagnosis.indexOf(item) !== -1;
    };

    checkItem = (currentArray, item) => {
        let result = false;
        for (let i = 0, n = currentArray.length; i < n; i++) {
            let currentItem = currentArray[i];
            if (currentItem === item) {
                result = true;
                break;
            }
        }
        return result;
    };

    toggleGender = item => {
        const currentGenders = this.state.gender;
        const isItemPresented = this.checkItem(currentGenders, item);
        if (isItemPresented) {
            let index = currentGenders.indexOf(item);
            currentGenders.splice(index, 1)
        } else {
            currentGenders.push(item);
        }
        this.setState({
            gender: currentGenders,
        });
    };

    toggleDiagnosis = item => {
        const currentDiagnosis = this.state.diagnosis;
        const isItemPresented = this.checkItem(currentDiagnosis, item);
        if (isItemPresented) {
            let index = currentDiagnosis.indexOf(item);
            currentDiagnosis.splice(index, 1)
        } else {
            currentDiagnosis.push(item);
        }
        this.setState({
            diagnosis: currentDiagnosis,
        });
    };

    onChangeAgeRange = values => {
        this.setState({
            age: values
        });
    };

    onChangeHealthScoreRange = values => {
        this.setState({
            healthScore: values
        });
    };

    updateBusinessIntelligence = () => {
        const { age, healthScore, gender, diagnosis } = this.state;
        this.props.updateBusinessIntelligence({
            age: age,
            healthScore: healthScore,
            gender: gender,
            diagnosis: diagnosis,
        });
    };

    render() {
        const { classes } = this.props;
        const { age, healthScore } = this.state;
        return (
            <React.Fragment>
                <Grid className={classes.currentTabContainer} container>
                    <Grid item sm={12} md={6}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>By Age</FormLabel>
                            <RangeLine age={age} onChangeRange={this.onChangeAgeRange} />
                        </FormGroup>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>By Health Score</FormLabel>
                            <RangeLine age={healthScore} onChangeRange={this.onChangeHealthScoreRange} RangeLineAxis={HealthScoreAxis} />
                        </FormGroup>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>By Diagnosis</FormLabel>
                            {
                                diagnosisArray.map((item, key) => {
                                    return (
                                        <div key={key} className={classes.dialogLabel}>
                                            <Checkbox
                                                className={classes.checkbox}
                                                checked={this.isDiagnosisChecked(item.type)}
                                                onChange={() => this.toggleDiagnosis(item.type)}
                                                classes={{root: classes.customCheckbox, checked: classes.checked}}
                                            />
                                            <Typography className={classes.checkboxLabel}>{item.label}</Typography>
                                        </div>
                                    )
                                })
                            }
                        </FormGroup>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>By Gender</FormLabel>
                            {
                                genderArray.map((item, key) => {
                                    return (
                                        <div key={key} className={classes.dialogLabel}>
                                            <Checkbox
                                                className={classes.checkbox}
                                                checked={this.isGenderChecked(item.type)}
                                                onChange={() => this.toggleGender(item.type)}
                                                classes={{root: classes.customCheckbox, checked: classes.checked}}
                                            />
                                            <Typography className={classes.checkboxLabel}>{item.label}</Typography>
                                        </div>
                                    )
                                })
                            }
                        </FormGroup>
                    </Grid>
                </Grid>
                <div className={classes.toolbar}>
                    <Button type="button" aria-label="Update" className={classes.resetButton} onClick={() => this.resetForm()}>
                        Reset
                        <FontAwesomeIcon icon={faTimesCircle} className={classes.filterIcon} size="1x" />
                    </Button>
                    <Button type="submit" aria-label="Update" className={classes.updateButton} onClick={() => this.updateBusinessIntelligence()}>
                        Update
                        <FontAwesomeIcon icon={faFilter} className={classes.filterIcon} size="1x" />
                    </Button>
                </div>
            </React.Fragment>
        );
    }
};

const mapStateToProps = (state)  => {
    return {
        businessIntelligence: get(state, 'custom.businessIntelligence.data', null),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBusinessIntelligence(data) {
            dispatch(businessIntelligenceAction.update(data));
        },
        resetBusinessIntelligence() {
            dispatch(businessIntelligenceAction.remove());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessIntelligenceForm));
