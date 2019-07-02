import React, { Container } from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PieChartByGender from "../charts/PieChartByGender";
import { COLOR_UNHEALTHY, COLOR_HEALTHY } from "../constants";

const styles = theme => ({
    chartsContainer: {
        padding: 5,
    },
    chartsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    singlePieChart: {
        [theme.breakpoints.only('xs')]: {
            width: '100%',
        },
    },
    legend: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    legendParameter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },
    square: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 5,
    }
});

const PieCharts = ({ classes }) => {
    return (
        <React.Fragment>
            <Grid className={classes.chart} item xs={12} sm={12} md={11}>
                <div className={classes.tableBlock}>
                    <Typography variant="h1">Diagnosis By Gender</Typography>
                </div>
                <div className={classes.chartsContainer}>
                    <Grid container sm={12} spacing={16}>
                        <Grid item sm={12} md={6} lg={3}>
                            <PieChartByGender label="Diabetes" healthy={680} unhealthy={320} />
                        </Grid>
                        <Grid item sm={12} md={6} lg={3}>
                            <PieChartByGender label="Measles" healthy={540} unhealthy={460} />
                        </Grid>
                        <Grid item sm={12} md={6} lg={3}>
                            <PieChartByGender label="Asthma" healthy={620} unhealthy={380} />
                        </Grid>
                        <Grid item sm={12} md={6} lg={3}>
                            <PieChartByGender label="Dementia" healthy={490} unhealthy={510} />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.legend}>
                    <div className={classes.legendParameter}>
                        <div className={classes.square} style={{ backgroundColor: COLOR_UNHEALTHY, border: `1px solid ${COLOR_UNHEALTHY}`}} ></div>
                        <Typography>Male</Typography>
                    </div>
                    <div className={classes.legendParameter}>
                        <div className={classes.square} style={{ backgroundColor: COLOR_HEALTHY, border: `1px solid ${COLOR_HEALTHY}`}} ></div>
                        <Typography>Female</Typography>
                    </div>
                </div>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(PieCharts);