import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = {

};

const LabResults = ({ classes }) => {
    return (
        <React.Fragment>
            <div className={classes.blockTitle}>
                <Typography className={classes.title}>Lab Results</Typography>
            </div>

            <Grid container xs={12} className={classes.content}>
                <div className={classes.photoAndVitals}>
                    <Typography>PLACE FOR RESULTS TABLE</Typography>
                </div>
            </Grid>
        </React.Fragment>
    );
}

export default withStyles(styles)(LabResults);
