import React, { Component } from "react";
import get from "lodash/get";

import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import MapWithStatistics from "../map";

import AverageHealthScore from "../charts/AverageHealthScore";
import Population from "../charts/Population";
import DiagnosisByAge from "../charts/DiagnosisByAge";
import { getAverageHealthScore, getDiagnosisByAge, getColorByHealthScore } from "../functions";

const styles = theme => ({
    chartsContainer: {
        padding: 5,
        border: `1px solid ${theme.palette.borderColor}`
    }
});

class HeatMap extends Component {

    render() {
        const { classes, businessIntelligence, isDiagnosisVisible, isAgeRangeVisible, currentCity, changeCity, patients, patientsByCurrentCity, patientsNumberArray } = this.props;
        const averageHealthScore = getAverageHealthScore(patientsByCurrentCity);
        const color = getColorByHealthScore(averageHealthScore);
        const diagnosisByAge = getDiagnosisByAge(patientsByCurrentCity);
        return (
            <React.Fragment>
                <Grid className={classes.chart} item xs={12} sm={12} md={6}>
                    <div className={classes.tableBlock}>
                        <Typography variant="h1">Yorkshire, UK</Typography>
                    </div>
                    <div className={classes.chartsContainer}>
                        <MapWithStatistics
                            patients={patients}
                            patientsNumberArray={patientsNumberArray}
                            businessIntelligence={businessIntelligence}
                            changeCity={changeCity}
                            currentCityId={currentCity.id}
                        />
                    </div>
                </Grid>
                <Grid className={classes.chart} item xs={12} sm={8} md={5}>
                    <div className={classes.tableBlock}>
                        <Typography variant="h1">Statistics: {get(currentCity, 'cityName', null)}</Typography>
                    </div>
                    <div className={classes.chartsContainer}>
                        <AverageHealthScore
                            color={color}
                            healthScore={averageHealthScore}
                        />
                        <Population
                            color={color}
                            population={get(currentCity, 'population', null)}
                        />
                        <DiagnosisByAge diagnosisByAge={diagnosisByAge} isDiagnosisVisible={isDiagnosisVisible} isAgeRangeVisible={isAgeRangeVisible} />
                    </div>
                </Grid>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(HeatMap);