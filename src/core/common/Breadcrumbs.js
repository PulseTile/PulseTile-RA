import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import styles from "../styles";

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

export default withStyles(styles.breadcrumbs)(Breadcrumbs);