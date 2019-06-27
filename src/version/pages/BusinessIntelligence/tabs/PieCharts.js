import React, { Container } from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({

});


const PieCharts = ({ classes }) => {
    return (
        <React.Fragment>
            <Grid className={classes.chart} item xs={12} sm={12} md={11}>
                <div className={classes.tableBlock}>
                    <Typography variant="h1">Diagnosis By Gender</Typography>
                </div>
            </Grid>
        </React.Fragment>
    );
}

export default withStyles(styles)(PieCharts);