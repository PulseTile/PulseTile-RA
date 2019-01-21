import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    breadcrumbsBlock: {
        display: "flex",
        height: "48px",
        alignItems: "center",
        border: "1px solid #e5e5e5",
        paddingLeft: "10px",
    }
};

const Breadcrumbs = ({ classes, location }) => {
    return (
        <div className={classes.breadcrumbsBlock}>
            <Typography>
                Home
            </Typography>
            <Typography>
             -
            </Typography>
            <Typography>
                Patient Summary
            </Typography>
        </div>
    );
};

export default withStyles(styles)(Breadcrumbs);