import React, { Component } from "react";
import get from "lodash/get";
import _ from "lodash";
import { connect } from 'react-redux';
import { setSidebarVisibility } from "react-admin";

import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid/index";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/index";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/index";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography/index";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/index";

import HeatMap from "./tabs/HeatMap";
import BarCharts from "./tabs/BarCharts";
import PieCharts from "./tabs/PieCharts";

import { businessIntelligenceAction } from "../../actions/BusinessIntelligence/businessIntelligenceAction";
import BusinessIntelligenceForm from "./fragments/BusinessIntelligenceForm";
import ChartsSelector from "./fragments/ChartsSelector";
import { HEAT_MAP, BAR_CHARTS, PIE_CHARTS } from "./constants";
import { getCityById } from "./dummyCityStatistic";

const styles = theme => ({
    mainBlock: {
        margin: 10,
    },
    expansionPanel: {
        height: "49px !important",
        border: `1px solid ${theme.palette.borderColor}`,
        '& > div': {
            minHeight: "49px !important",
        }
    },
    currentExpansionPanel: {
        margin: "0px !important",
        border: `1px solid ${theme.palette.borderColor}`,
        '& > div': {
            minHeight: "49px !important",
        }
    },
    expansionPanelSummary: {
        backgroundColor: theme.palette.mainColor,
        paddingLeft: 16,
        '& > div': {
            margin: "0px !important",
            marginTop: "0px",
            marginBottom: "0px",
        }
    },
    emptyBlock: {
        flexGrow: 1,
    },
    expandIcon: {
        height: 35,
        paddingLeft: 10,
        paddingRight: 10,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        color: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.paperColor,
    },
    expandBlockIcon: {
        height: 35,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 35,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        color: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.paperColor,
    },
    expansionTypography: {
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        fontSize: 18,
        fontWeight: 700,
    },
    expansionPanelDetails: {
        display: "flex",
        flexDirection: "column",
        padding: 0,
    },

    root: {
        width: '100%',
        height: '100%',
        padding: 5,
    },
    currentTabContainer: {
        width: "100%",
        backgroundColor: theme.palette.paperColor,
        margin: 0,
    },
    tableBlock: {
        backgroundColor: theme.palette.tableHeadColor,
        padding: 10,
        borderLeft: `0.5px solid ${theme.palette.paperColor}`,
        borderRight: `0.5px solid ${theme.palette.paperColor}`,
    }
});

class BusinessIntelligence extends Component {

    state = {
        isFromPanelOpen: true,
        isChartsPanelOpen: true,
        currentTab: HEAT_MAP,
        currentCity: getCityById('york'),
    };

    componentDidMount() {
        this.props.setSidebarVisibility(false);
        this.props.getPatientsStatistic();
    }

    changeCity = id => {
        this.setState({
            currentCity: getCityById(id),
        });
    };

    togglePanel = panel => {
        this.setState({
            [panel]: !this.state[panel],
        });
    };

    changeCurrentTab = tabName => {
        this.setState({
            currentTab: tabName
        });
    };

    getCurrentTabContent = () => {
        const { currentTab } = this.state;
        let result = HeatMap;
        if (currentTab === BAR_CHARTS) {
            result = BarCharts;
        }
        if (currentTab === PIE_CHARTS) {
            result = PieCharts;
        }
        return result;
    };

    isDiagnosisVisible = type => {
        const { businessIntelligence } = this.props;
        const diagnosis = get(businessIntelligence, 'diagnosis', []);
        return !businessIntelligence || diagnosis.indexOf(type) !== -1;
    };

    isGenderVisible = type => {
        const { businessIntelligence } = this.props;
        const genders = get(businessIntelligence, 'gender', []);
        return !businessIntelligence || genders.indexOf(type) !== -1;
    };

    isEmptyResults = () => {
        const { businessIntelligence } = this.props;
        const diagnosis = get(businessIntelligence, 'diagnosis', []);
        const genders = get(businessIntelligence, 'gender', []);
        return businessIntelligence && (diagnosis.length === 0 || genders.length === 0);
    };

    isAgeRangeVisible = currentRange => {
        const { businessIntelligence } = this.props;
        let minCurrentRange = 81;
        let maxCurrentRange = 125;
        if (currentRange !== '81+') {
            const currentRangeArray = currentRange.split('-');
            minCurrentRange = currentRangeArray[0];
            maxCurrentRange = currentRangeArray[1];
        }
        const minAge = get(businessIntelligence, 'age[0]', 0);
        const maxAge = get(businessIntelligence, 'age[1]', 125);
        return !businessIntelligence || (minAge <= minCurrentRange && maxCurrentRange <= maxAge);
    };

    getPatientsByCity = () => {
        const { patients } = this.props;
        const patientsByCity = _.mapValues(_.groupBy(patients, 'location'),
            clist => clist.map(item => _.omit(item, 'location')));
        const patientsArray = Object.entries(patientsByCity);
        let result = [];
        patientsArray.map(item => {
            result.push({
                city: item[0],
                number: item[1].length
            })
        });
        return result;
    };

    render() {
        const { classes, history, businessIntelligence, patients } = this.props;
        const { isFromPanelOpen, isChartsPanelOpen, currentTab, currentCity } = this.state;
        const patientsNumberArray = this.getPatientsByCity();
        const patientsByCurrentCity = patients ? patients.filter(item => item.location === currentCity.cityName) : [];
        const CurrentTabContent = this.getCurrentTabContent();
        return (
            <Grid item xs={12} className={classes.mainBlock}>
                <ExpansionPanel className={isFromPanelOpen ? classes.currentExpansionPanel : classes.expansionPanel} expanded={isFromPanelOpen} onChange={() => this.togglePanel('isFromPanelOpen')}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                        <Typography className={classes.expansionTypography} >Business Intelligence</Typography>
                    </ExpansionPanelSummary>
                    {
                        isFromPanelOpen &&
                            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                                <BusinessIntelligenceForm />
                            </ExpansionPanelDetails>
                    }
                </ExpansionPanel>

                <ExpansionPanel className={isChartsPanelOpen ? classes.currentExpansionPanel : classes.expansionPanel} expanded={isChartsPanelOpen} onChange={() => this.togglePanel('isChartsPanelOpen')}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                        <Typography className={classes.expansionTypography}>{currentTab}</Typography>
                    </ExpansionPanelSummary>
                    {
                        isChartsPanelOpen &&
                            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                                <Grid className={classes.currentTabContainer} container>
                                    <CurrentTabContent
                                        classes={classes}
                                        patients={patients}
                                        currentCity={currentCity}
                                        changeCity={this.changeCity}
                                        patientsNumberArray={patientsNumberArray}
                                        businessIntelligence={businessIntelligence}
                                        patientsByCurrentCity={patientsByCurrentCity}
                                        isAgeRangeVisible={this.isAgeRangeVisible}
                                        isDiagnosisVisible={this.isDiagnosisVisible}
                                        isGenderVisible={this.isGenderVisible}
                                        isEmptyResults={this.isEmptyResults}
                                    />
                                    <ChartsSelector classes={classes} currentTab={currentTab} changeCurrentTab={this.changeCurrentTab} history={history} />
                                </Grid>
                            </ExpansionPanelDetails>
                    }
                </ExpansionPanel>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        businessIntelligence: get(state, 'custom.businessIntelligence.data', null),
        patients: get(state, 'custom.businessIntelligence.patients', []),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setSidebarVisibility(params) {
            dispatch(setSidebarVisibility(params));
        },
        getPatientsStatistic() {
            dispatch(businessIntelligenceAction.request());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessIntelligence));
