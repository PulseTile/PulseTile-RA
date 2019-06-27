import React from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import AverageHealthScore from "../charts/AverageHealthScore";
import Population from "../charts/Population";
import DiagnosisByAge from "../charts/DiagnosisByAge";

const styles = theme => ({
    chartsContainer: {
        padding: 5,
        border: `1px solid ${theme.palette.borderColor}`
    }
});

const HeatMap = ({ classes }) => {
    return (
        <React.Fragment>
            <Grid className={classes.chart} item xs={12} sm={12} md={6}>
                <div className={classes.tableBlock}>
                    <Typography variant="h1">Yorkshire, UK</Typography>
                </div>
            </Grid>
            <Grid className={classes.chart} item xs={12} sm={8} md={5}>
                <div className={classes.tableBlock}>
                    <Typography variant="h1">Statistics</Typography>
                </div>
                <div className={classes.chartsContainer}>
                    <AverageHealthScore />
                    <Population />
                    <DiagnosisByAge />
                </div>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(HeatMap);