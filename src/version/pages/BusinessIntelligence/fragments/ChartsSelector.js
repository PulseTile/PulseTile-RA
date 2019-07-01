import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

import barCharts from "../images/barCharts.png";
import barChartsSelected from "../images/barChartsSelected.png";
import pieCharts from "../images/pieChartsSelected.png";
import pieChartsSelected from "../images/pieChartsSelected.png";
import heatMap from "../images/heatMap.png";
import heatMapSelected from "../images/heatMapSelected.png";

import { HEAT_MAP, BAR_CHARTS, PIE_CHARTS } from "../constants";

const styles = theme => ({
    imageBackgroundActive: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10,
        padding: "10px 5px",
        backgroundColor: theme.palette.mainColor,
        textAlign: 'center',
    },
    imageBackground: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10,
        padding: "10px 5px",
        backgroundColor: theme.palette.paperColor,
        textAlign: 'center',
    },
    chartTextActive: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.paperColor,
    },
    chartText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.fontColor,
    }
});

class ChartsSelector extends Component {

    render() {
        const { classes, currentTab, changeCurrentTab } = this.props;
        return (
            <Grid className={classes.chart} item xs={12} sm={4} md={1}>
                <div className={classes.tableBlock}>
                    <Typography variant="h1">Charts</Typography>
                </div>
                <div className={currentTab === HEAT_MAP ? classes.imageBackgroundActive : classes.imageBackground} onClick={() => changeCurrentTab(HEAT_MAP)}>
                    <CardMedia
                        className={classes.patientPhoto}
                        component="img"
                        alt="Heat Map"
                        image={currentTab === HEAT_MAP ? heatMapSelected : heatMap }
                        title="Heat Map"
                    />
                    <Typography variant="body1" className={currentTab === HEAT_MAP ? classes.chartTextActive : classes.chartText}>Heat Map</Typography>
                </div>
                <div className={currentTab === BAR_CHARTS ? classes.imageBackgroundActive : classes.imageBackground} onClick={() => changeCurrentTab(BAR_CHARTS)}>
                    <CardMedia
                        className={classes.patientPhoto}
                        component="img"
                        alt="Bar Charts"
                        image={currentTab === BAR_CHARTS ? barChartsSelected : barCharts }
                        title="Bar Charts"
                    />
                    <Typography variant="body1" className={currentTab === BAR_CHARTS ? classes.chartTextActive : classes.chartText}>Bar Charts</Typography>
                </div>
                <div className={currentTab === PIE_CHARTS ? classes.imageBackgroundActive : classes.imageBackground} onClick={() => changeCurrentTab(PIE_CHARTS)}>
                    <CardMedia
                        className={classes.patientPhoto}
                        component="img"
                        alt="Pie Charts"
                        image={currentTab === PIE_CHARTS ? pieChartsSelected : pieCharts }
                        title="Pie Charts"
                    />
                    <Typography variant="body1" className={currentTab === PIE_CHARTS ? classes.chartTextActive : classes.chartText}>Pie Charts</Typography>
                </div>
            </Grid>
        )
    }
}

export default withStyles(styles)(ChartsSelector);
