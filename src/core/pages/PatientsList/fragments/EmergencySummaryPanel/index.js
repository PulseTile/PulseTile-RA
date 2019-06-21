import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles/index';
import Typography from '@material-ui/core/Typography/index';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/index';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/index';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/index';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { emergencySummaryAction } from "../../../../actions/emergencySummaryAction";
import VitalsChart from "../../../../../version/plugins/Vitals/VitalsChart";
import ItemBlock from "./ItemBlock";

const styles = theme => ({
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
        paddingTop: 10,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        fontSize: 18,
        fontWeight: 700,
    },
    expansionPanelDetails: {
        display: "flex",
        flexDirection: "column",
        padding: 0,
    },
    itemBlock: {
        margin: 10,
    },
    blockContent: {
        marginTop: 5,
    },
    showAll: {
        color: theme.palette.secondaryMainColor,
        fontWeight: 800,
        cursor: 'pointer',
    }
});

class EmergencySummaryPanel extends Component {

    state = {
        isPanelOpen: true,
    };

    togglePanel = () => {
        this.setState({
            isPanelOpen: !this.state.isPanelOpen,
        });
    };

    componentDidMount() {
        const { id } = this.props;
        if (id) {
            this.props.getEmergencySummary(id);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { id } = this.props;
        if (nextProps.id !== id) {
            this.props.getEmergencySummary(id);
        }
    }

    getResourceList = (resourse, name) => {
        const { emergencySummary } = this.props;
        const listArray = get(emergencySummary, resourse, []);
        let result = [];
        listArray.map(item => {
            result.push(item[name]);
        });
        return result;
    };

    render() {
        const { classes, currentData, id, emergencySummary, history, isLoading } = this.props;
        const { isPanelOpen } = this.state;

        const currentPatient = get(currentData, id, null);

        const allergiesList = this.getResourceList('allergies', 'cause');
        const medicationsList = this.getResourceList('medications', 'name');
        const problemsList = this.getResourceList('problems', 'problem');


        return (
            <ExpansionPanel className={isPanelOpen ? classes.currentExpansionPanel : classes.expansionPanel} expanded={isPanelOpen} onChange={() => this.togglePanel()}>
                <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                    <Typography className={classes.expansionTypography}>Emergency Summary</Typography>
                </ExpansionPanelSummary>
                {
                    isPanelOpen &&
                        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                            <div className={classes.itemBlock}>
                                <Typography variant="h3">Name</Typography>
                                <Typography className={classes.blockContent}>{get(currentPatient, 'firstName', null)} {get(currentPatient, 'lastName', null)}</Typography>
                            </div>
                            <ItemBlock isLoading={isLoading} list={problemsList} title="Diagnosis" />
                            <ItemBlock isLoading={isLoading} list={medicationsList} title="Medications" />
                            <ItemBlock isLoading={isLoading} list={allergiesList} title="Allergies" />
                            <div className={classes.itemBlock}>
                                <Typography variant="h3">Vitals</Typography>
                                <VitalsChart vitalsEmergencySummary={get(emergencySummary, 'vitalsigns', [])} history={history} />
                            </div>
                        </ExpansionPanelDetails>
                }
            </ExpansionPanel>
        );
    }
}

const mapStateToProps = state => {
    return {
        emergencySummary: get(state, 'custom.emergencySummary.data', null),
        isLoading: get(state, 'custom.emergencySummary.loading', null),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getEmergencySummary(patientId) {
            dispatch(emergencySummaryAction.request('allergies', patientId));
            dispatch(emergencySummaryAction.request('medications', patientId));
            dispatch(emergencySummaryAction.request('problems', patientId));
            dispatch(emergencySummaryAction.request('vitalsigns', patientId));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmergencySummaryPanel));
