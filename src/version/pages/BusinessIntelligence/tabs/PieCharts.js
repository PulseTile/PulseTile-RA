import React from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PieChartByGender from "../charts/PieChartByGender";
import { COLOR_MALE, COLOR_FEMALE } from "../constants";

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
                            <PieChartByGender label="Diabetes" male={680} female={320} />
                        </Grid>
                        <Grid item sm={12} md={6} lg={3}>
                            <PieChartByGender label="Measles" male={540} female={460} />
                        </Grid>
                        <Grid item sm={12} md={6} lg={3}>
                            <PieChartByGender label="Asthma" male={620} female={380} />
                        </Grid>
                        <Grid item sm={12} md={6} lg={3}>
                            <PieChartByGender label="Dementia" male={490} female={510} />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.legend}>
                    <div className={classes.legendParameter}>
                        <div className={classes.square} style={{ backgroundColor: COLOR_MALE, border: `1px solid ${COLOR_MALE}`}} ></div>
                        <Typography>Male</Typography>
                    </div>
                    <div className={classes.legendParameter}>
                        <div className={classes.square} style={{ backgroundColor: COLOR_FEMALE, border: `1px solid ${COLOR_FEMALE}`}} ></div>
                        <Typography>Female</Typography>
                    </div>
                </div>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(PieCharts);