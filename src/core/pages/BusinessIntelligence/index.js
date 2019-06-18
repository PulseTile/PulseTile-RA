import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';
import { setSidebarVisibility } from "react-admin";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

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
        padding: 10,
    },
});

const HEAT_MAP = 'Heat Map';
const BAR_CHARTS = 'Bar Charts';
const PIE_CHARTS = 'Pie Charts';

class BusinessIntelligence extends Component {

    state = {
        isFromPanelOpen: true,
        isChartsPanelOpen: true,
        currentTab: HEAT_MAP
    };

    componentDidMount() {
        this.props.setSidebarVisibility(false);
    }

    togglePanel = panel => {
        this.setState({
            [panel]: !this.state[panel],
        });
    };

    render() {
        const { classes } = this.props;
        const { isFromPanelOpen, isChartsPanelOpen, currentTab } = this.state;
        return (
            <Grid item xs={12} className={classes.mainBlock}>
                <ExpansionPanel className={isFromPanelOpen ? classes.currentExpansionPanel : classes.expansionPanel} expanded={isFromPanelOpen} onChange={() => this.togglePanel('isFromPanelOpen')}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                        <Typography className={classes.expansionTypography} >Business Intelligence</Typography>
                    </ExpansionPanelSummary>
                    {
                        isFromPanelOpen &&
                            <ExpansionPanelDetails className={classes.expansionPanelDetails}>

                                <Typography>Place for Business Intelligence form</Typography>

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

                                <Typography>Place for Business Intelligence information</Typography>



                            </ExpansionPanelDetails>
                    }
                </ExpansionPanel>
            </Grid>
        );
    }
}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
    return {
        setSidebarVisibility(params) {
            dispatch(setSidebarVisibility(params));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessIntelligence));
