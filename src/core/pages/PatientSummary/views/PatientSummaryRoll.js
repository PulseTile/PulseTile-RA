import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PhotoAndVitals from "../fragments/PhotoAndVitals";
import PatientSummaryPanels from "../fragments/PatientSummaryPanels";
import LabResults from "../fragments/LabResults";
import DummyVitalsChart from "../fragments/DummyVitalsChart";
import EventsTimeline from "../fragments/EventsTimeline";

const styles = theme => ({
    headerBlock:{
        width: '100%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    blockTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 49,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
        paddingRight: 10,
    },
    blockTitleLeft: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 49,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
        paddingRight: 10,
        borderRight: `0.5px solid ${theme.palette.paperColor}`
    },
    blockTitleRight: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 49,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
        paddingRight: 10,
        borderLeft: `0.5px solid ${theme.palette.paperColor}`
    },
    title: {
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
    },
    content: {
        width: '100%',
        backgroundColor: theme.palette.paperColor,
    },
    photoAndVitals: {
        padding: 10,
    },
    chartBlock: {
        padding: 10,
    },
    dummyEvents: {
        margin: 20,
    }
});

class PatientSummaryTable extends Component {

    render() {
        const { classes, emergencySummary, history, location, isVitalsLoading } = this.props;
        return (
            <div className={classes.headerBlock}>
                <PhotoAndVitals classes={classes} />
                <PatientSummaryPanels classes={classes} />
                <LabResults classes={classes} location={location} />
                <Grid container xs={12} className={classes.content}>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className={classes.blockTitleLeft}>
                            <Typography className={classes.title}>Timeline</Typography>
                        </div>
                        <EventsTimeline />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className={classes.blockTitleRight}>
                            <Typography className={classes.title}>Vitals</Typography>
                        </div>
                        <div className={classes.chartBlock}>
                        {
                            isVitalsLoading
                                ? <Typography>Loading...</Typography>
                                // : <VitalsChart vitalsEmergencySummary={get(emergencySummary, 'vitalsigns', [])} history={history} />
                                : <DummyVitalsChart />
                        }
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        emergencySummary: get(state, 'custom.emergencySummary.data', null),
        isVitalsLoading: get(state, 'custom.emergencySummary.loading', null),
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(PatientSummaryTable));