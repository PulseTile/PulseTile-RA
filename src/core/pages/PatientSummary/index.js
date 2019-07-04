import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormGroup from "@material-ui/core/FormGroup";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import {
    synopsisAllergiesAction,
    synopsisContactsAction,
    synopsisMedicationsAction,
    synopsisProblemsAction
} from "../../actions/synopsisActions";
import { nonCoreSynopsisActions } from "../../../version/config/nonCoreSynopsis";
import { emergencySummaryAction } from "../../actions/emergencySummaryAction";
import { currentPatientAction } from "../../actions/currentPatientAction";

import PatientSummaryTable from "./views/PatientSummaryTable";
import PatientSummaryRoll from "./views/PatientSummaryRoll";
import { synopsisData } from "./config";
import SettingsDialog from "./SettingsDialog";
import Breadcrumbs from "../../common/Breadcrumbs";
import { themeCommonElements } from "../../../version/config/theme.config";
import { getSummaryContainerStyles } from "./functions";

const styles = theme => ({
    summaryContainer: getSummaryContainerStyles(synopsisData),
    card: {
        borderRadius: 0,
        boxShadow: theme.isOldDesign ? "0px 2px 4px rgba(0, 0, 0, 0.3)" : null,
    },
    media: {
        backgroundColor: theme.palette.mainColor,
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    container: {
        width: "100%",
        height: "100%",
        background: theme.patientSummaryPanel.container.background,
        backgroundSize: "cover",
    },
    topBlock: {
        display: "flex",
        flexDirection: "column",
        height: theme.isOldDesign ? 50 : 100,
        backgroundColor: theme.palette.mainColor,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        border: theme.isOldDesign ? `1px solid ${theme.palette.borderColor}` : null,
            '&:hover': {
            cursor: "pointer",
        },
    },
    formGroupLabel: {
        marginTop: 18,
    },
    formControlLabel: {
        marginBottom: 10,
    },
    radioGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: 15,
        marginRight: 10,
    },
    radio: {
        '&$checked': {
            color: theme.palette.mainColor,
        }
    },
    checked: {}
});

const TABLE_VIEW = 'table';
const ROLL_VIEW = 'roll';

class PatientSummaryInfo extends Component {

    state = {
        isRollView: get(themeCommonElements, 'hasPatientSummaryRoll', false),
    };

    toggleView = () => {
        this.setState({
            isRollView: !this.state.isRollView,
        });
    };

    componentDidMount() {
        if (localStorage.getItem('role') === 'PHR') {
            this.props.updateCurrentPatient(localStorage.getItem('patientId'));
        }
        if (localStorage.getItem('userId') && localStorage.getItem('username')) {
            this.props.getPatientSynopsis();
            // this.props.getEmergencySummary(localStorage.getItem('patientId'));
        }
    }

    componentWillReceiveProps(nextProps, nextContent) {
        const { patientInfo } = this.props;
        if (patientInfo !== nextProps.patientInfo) {
            // this.props.getRandomPhoto(get(nextProps, 'patientInfo.gender', 'male'));
        }
    }

    render() {
        const { classes, location, history } = this.props;
        const { isRollView } = this.state;
        const breadcrumbsResource = [
            { url: location.pathname, title: "Patient Summary", isActive: false }
        ];
        const viewType = isRollView ? ROLL_VIEW : TABLE_VIEW;
        const hasPatientSummaryRoll = get(themeCommonElements, 'hasPatientSummaryRoll', false);
        return (
            <Grid className={classes.container} >
                <Breadcrumbs resource={breadcrumbsResource} />
                <div className={classes.toggleViewBlock}>
                    <SettingsDialog className={classes.settingsIcon} />
                    {
                        hasPatientSummaryRoll &&
                            <div className={classes.toggleViewBlock} >
                                <Typography variant="h1" className={classes.formGroupLabel}>View</Typography>
                                <FormGroup className={classes.formGroup}>
                                    <RadioGroup name="viewType" className={classes.radioGroup} value={viewType} onChange={() => this.toggleView()} row>
                                        <FormControlLabel
                                            className={classes.formControlLabel}
                                            value={ROLL_VIEW}
                                            control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                            label="Roll"
                                        />
                                        <FormControlLabel
                                            className={classes.formControlLabel}
                                            value={TABLE_VIEW}
                                            control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                            label="Table"
                                        />
                                    </RadioGroup>
                                </FormGroup>
                            </div>
                    }
                </div>
                <Grid className={classes.summaryContainer} spacing={16} container>
                    {
                        isRollView ? <PatientSummaryRoll history={history} /> : <PatientSummaryTable history={history} />
                    }
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        patientInfo: get(state, 'custom.currentPatient.patientInfo.data', null),
    }
};

const mapDispatchToProps = dispatch => {

    const coreSynopsisActions = [
        synopsisAllergiesAction,
        synopsisContactsAction,
        synopsisProblemsAction,
        synopsisMedicationsAction,
    ];

    const synopsisActions = coreSynopsisActions.concat(nonCoreSynopsisActions);

    return {
        getPatientSynopsis() {
            synopsisActions.map(item => {
                return dispatch(item.request());
            });
        },
        getEmergencySummary(patientId) {
            dispatch(emergencySummaryAction.request('vitalsigns', patientId));
        },
        getRandomPhoto(gender) {
            dispatch(currentPatientAction.requestPhoto(gender));
        },
        updateCurrentPatient(data) {
            dispatch(currentPatientAction.request(data));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientSummaryInfo));