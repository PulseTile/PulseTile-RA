import React, { Component } from "react";
import * as d3 from "d3";

class Axis extends Component {
    gRef = React.createRef();

    componentDidMount() {
        this.d3render();
    }
    componentDidUpdate() {
        this.d3render();
    }

    d3render() {
        const { scale, orientation } = this.props;
        const axis = d3[`axis${orientation}`](scale);

        d3.select(this.gRef.current).call(axis);
    }

    render() {
        const { x, y } = this.props;
        return <g transform={`translate(${x}, ${y})`} ref={this.gRef} />;
    }
}

export default Axis;
