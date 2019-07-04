import React from "react";

import { withStyles } from '@material-ui/core/styles/index';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartBar} from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
    titleBlock: {
        display: "flex",
        alignItems: "center",
        height: 49,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        paddingLeft: 15,
    },
    title: {
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        fontSize: 18,
        fontWeight: 700,
    },
    secondTitle: {
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 24,
        fontWeight: 700,
    },
    chartIcon: {
        paddingRight: 5,
    },
    description: {
        padding: 10,
        fontSize: 16,
    }
});

const BarChartTitle = ({ classes, mainTitle, secondTitle, description, }) => {
    return (
        <div className={classes.chartContainer}>
            <div className={classes.titleBlock}>
                <Tooltip title="Chart">
                    <FontAwesomeIcon className={classes.chartIcon} icon={faChartBar} size="1.5x" />
                </Tooltip>
                <Typography className={classes.title}>{mainTitle}</Typography>
            </div>
            <Typography variant="h1" className={classes.secondTitle}>{secondTitle}</Typography>
            <Typography className={classes.description}>{description}</Typography>
        </div>
    )
};

export default withStyles(styles)(BarChartTitle);