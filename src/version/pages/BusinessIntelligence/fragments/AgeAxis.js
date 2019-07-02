import React from "react";
import * as d3 from "d3";

import { withStyles } from '@material-ui/core/styles';

import Axis from "./Axis";

const styles = theme => ({
    axisBlock: {

    },
});

const AgeAxis = ({ classes }) => {
    const scale = d3.scaleLinear().domain([0, 100]).range([0, 600]);

    return (
        <div className={classes.axisBlock}>
            <svg>
                <Axis x={10} y={20} scale={scale} orientation={"Bottom"} />
            </svg>
        </div>
    );
};

export default withStyles(styles)(AgeAxis);
