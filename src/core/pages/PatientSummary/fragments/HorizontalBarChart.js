import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    backgroundBlock: {
        height: 16,
        backgroundColor: theme.palette.disabledColor,
        borderRadius: 8,
    },
    coloredBlock: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        height: '100%',
    },
    title: {
        marginTop: 15,
    }
});

const HorizontalBarChart = ({ classes, title, color, value, maximal }) => {
    const colorBlockWidth = 100 * value / maximal;
    return (
        <React.Fragment>
            <div className={classes.backgroundBlock}>
                <div className={classes.coloredBlock} style={{ backgroundColor: color, width: colorBlockWidth + '%' }}></div>
            </div>
            <Typography variant="caption" className={classes.title}>{title}</Typography>
        </React.Fragment>
    );
};

export default withStyles(styles)(HorizontalBarChart);
