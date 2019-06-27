import React  from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({

});

const BarCharts = ({ classes }) => {
    return (
        <React.Fragment>
            <Grid className={classes.chart} item xs={12} sm={12} md={6}>
                <div className={classes.tableBlock}>
                    <Typography variant="h1">Diagnosis By Age</Typography>
                </div>
            </Grid>
            <Grid className={classes.chart} item xs={12} sm={8} md={5}>
                <div className={classes.tableBlock}>
                    <Typography variant="h1">Health Score By Age</Typography>
                </div>
            </Grid>
        </React.Fragment>
    );
}

export default withStyles(styles)(BarCharts);