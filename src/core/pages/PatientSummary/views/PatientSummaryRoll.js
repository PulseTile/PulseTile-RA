import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import VitalsChart from "../../../../version/plugins/Vitals/VitalsChart";

import PhotoAndVitals from "../fragments/PhotoAndVitals";
import PatientSummaryPanels from "../fragments/PatientSummaryPanels";
import LabResults from "../fragments/LabResults";

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
                    <Grid item xs={12} sm={12} md={6} className={classes.timelineBlock}>
                        <div className={classes.blockTitle}>
                            <Typography className={classes.title}>Timeline</Typography>
                        </div>
                        <Typography>PLACE FOR TIMELINE</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} className={classes.timelineBlock}>
                        <div className={classes.blockTitle}>
                            <Typography className={classes.title}>Vitals</Typography>
                        </div>
                        <div className={classes.chartBlock}>
                        {
                            isVitalsLoading
                                ? <Typography>Loading...</Typography>
                                : <VitalsChart vitalsEmergencySummary={get(emergencySummary, 'vitalsigns', [])} history={history} />
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