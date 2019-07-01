import React, { Container } from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PieChartByGender from "../charts/PieChartByGender";

const styles = theme => ({
    chartsContainer: {
        padding: 5,
    },
    chartsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
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
                    <div className={classes.chartsRow}>
                        <PieChartByGender label="Diabetes" healthy={680} unhealthy={320} />
                        <PieChartByGender label="Measles" healthy={540} unhealthy={460} />
                    </div>
                    <div className={classes.chartsRow}>
                        <PieChartByGender label="Asthma" healthy={620} unhealthy={380} />
                        <PieChartByGender label="Dementia" healthy={490} unhealthy={510} />
                    </div>
                </div>
            </Grid>
        </React.Fragment>
    );
}

export default withStyles(styles)(PieCharts);