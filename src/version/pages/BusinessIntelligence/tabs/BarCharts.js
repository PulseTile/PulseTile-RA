import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DiagnosisByAgeBars from "../charts/DiagnosisByAgeBars";
import HealthScoreByAge from "../charts/HealthScoreByAge";
import EmptyListBlock from "../../../../core/common/ResourseTemplates/EmptyListBlock";
import { getDiagnosisByAge } from "../functions";

const styles = theme => ({
    chartsContainer: {
        padding: 5,
        border: `1px solid ${theme.palette.borderColor}`
    }
});

class BarCharts extends Component {
    render() {
        const { classes, isAgeRangeVisible, isDiagnosisVisible, isEmptyResults, patientsByCurrentCity } = this.props;
        const diagnosisByAge = getDiagnosisByAge(patientsByCurrentCity);
        return (
            <React.Fragment>
                <Grid className={classes.chart} item xs={12} sm={12} md={6}>
                    <div className={classes.tableBlock}>
                        <Typography variant="h1">Diagnosis By Age</Typography>
                    </div>
                    {
                        isEmptyResults() ? <EmptyListBlock /> :
                            <div className={classes.chartsContainer}>
                                <DiagnosisByAgeBars
                                    diagnosisByAge={diagnosisByAge}
                                    isDiagnosisVisible={isDiagnosisVisible}
                                    isAgeRangeVisible={isAgeRangeVisible}
                                />
                            </div>
                    }
                </Grid>
                <Grid className={classes.chart} item xs={12} sm={8} md={5}>
                    <div className={classes.tableBlock}>
                        <Typography variant="h1">Health Score By Age</Typography>
                    </div>
                    {
                        isEmptyResults() ? <EmptyListBlock /> :
                            <div className={classes.chartsContainer}>
                                <HealthScoreByAge
                                    diagnosisByAge={diagnosisByAge}
                                    isDiagnosisVisible={isDiagnosisVisible}
                                    isAgeRangeVisible={isAgeRangeVisible}
                                />
                            </div>
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(BarCharts);