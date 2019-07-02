import React from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography";

import { COLOR_GREEN, COLOR_RED, COLOR_AMBER } from "../constants";

const styles = theme => ({
    legend: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    title: {
        paddingTop: 5,
    },
    legendParameter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        margin: 5,
    },
    square: {
        width: 16,
        height: 16,
        marginRight: 5,
    }
});

const MapLegend = ({ classes, isPoorSelected, isGoodSelected, isVeryGoodSelected, togglePoor, toggleGood, toggleVeryGood }) => {
    return (
        <div className={classes.legend}>
            <Typography variant="h1" className={classes.title}>HealthScore</Typography>
            <div className={classes.legendParameter} onClick={() => togglePoor()}>
                <div className={classes.square} style={{ opacity: isPoorSelected ? 1 : 0.6, backgroundColor: COLOR_RED, border: `1px solid ${COLOR_RED}`}} ></div>
                <Typography>Poor (0-25)</Typography>
            </div>
            <div className={classes.legendParameter} onClick={() => toggleGood()}>
                <div className={classes.square} style={{ opacity: isGoodSelected ? 1 : 0.6, backgroundColor: COLOR_AMBER, border: `1px solid ${COLOR_AMBER}`}} ></div>
                <Typography>Good (26-75)</Typography>
            </div>
            <div className={classes.legendParameter} onClick={() => toggleVeryGood()}>
                <div className={classes.square} style={{ opacity: isVeryGoodSelected ? 1 : 0.6, backgroundColor: COLOR_GREEN, border: `1px solid ${COLOR_GREEN}`}} ></div>
                <Typography>Very Good (76-100)</Typography>
            </div>
        </div>
    );
};

export default withStyles(styles)(MapLegend);