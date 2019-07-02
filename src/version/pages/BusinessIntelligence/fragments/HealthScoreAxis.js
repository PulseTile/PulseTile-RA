import React from "react";
import * as d3 from "d3";

import Axis from "./Axis";

const HealthScoreAxis = ({ }) => {
    const scale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, 200]);

    return (
        <svg width="800" height="400" id="svg">
            <Axis x={10} y={20} scale={scale} orientation={"Bottom"} />
        </svg>
    );
};

export default HealthScoreAxis;
