import React from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    mainBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: -25,
    },
    itemBlock: {
        width: '30%',
        height: 30,
        textAlign: 'center',
    },
    itemBlockCenter: {
        width: '40%',
        height: 30,
        textAlign: 'center',
    },
    borderBlock: {
        height: 15,
    },
    borderBlockCenter: {
        height: 15,
        borderLeft: `1px solid ${theme.palette.fontColor}`,
        borderRight: `1px solid ${theme.palette.fontColor}`
    }
});

const HealthScoreAxis = ({ classes }) => {
    return (
        <div className={classes.mainBlock}>
            <div className={classes.itemBlock}>
                <div className={classes.borderBlock}></div>
                <Typography variant="body2">Poor</Typography>
            </div>
            <div className={classes.itemBlockCenter}>
                <div className={classes.borderBlockCenter}></div>
                <Typography variant="body2">Good</Typography>
            </div>
            <div className={classes.itemBlock}>
                <div className={classes.borderBlock}></div>
                <Typography variant="body2">Very Good</Typography>
            </div>
        </div>
    );
};

export default withStyles(styles)(HealthScoreAxis);
