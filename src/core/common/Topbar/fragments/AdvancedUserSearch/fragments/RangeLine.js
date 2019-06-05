import React, { Component } from "react";
import { Range } from "react-range";

import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import RenderTrack from "./RenderTrack";
import RenderThumb from "./RenderThumb";
import formStyles from "./formStyles";

class RangeLine extends Component {

    render() {
        const { classes, age, onChangeRange } = this.props;
        return (
            <div className={classes.rangeLine}>
                <Range
                    values={age} step={1} min={0} max={100} onChange={values => onChangeRange(values)}
                    renderTrack={({ props, children }) =>
                        <RenderTrack props={props} children={children} value={age} min={0} max={100} />}
                    renderThumb={({ props, isDragged }) =>
                        <RenderThumb props={props} isDragged={isDragged} />}
                />
                <div className={classes.rangeOutput} id="output">
                    <Typography>
                        {age[0].toFixed(0)} - {age[1].toFixed(0)}
                    </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(formStyles)(RangeLine);
