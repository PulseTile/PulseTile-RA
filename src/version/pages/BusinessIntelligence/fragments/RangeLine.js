import React, { Component } from "react";
import { Range } from "react-range/lib/index";

import { withStyles } from '@material-ui/core/styles/index';
import Typography from "@material-ui/core/Typography/index";

import RenderTrack from "./RenderTrack";
import RenderThumb from "./RenderThumb";

const styles = theme => ({
    rangeLine: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: '75%',
        marginLeft: 10,
    },
    rangeOutput: {
        marginTop: 10,
    },
});

class RangeLine extends Component {

    render() {
        const { classes, age, onChangeRange, RangeLineAxis, hasRangeOutput } = this.props;
        return (
            <div className={classes.rangeLine}>
                <Range
                    values={age} step={10} min={0} max={100} onChange={values => onChangeRange(values)}
                    renderTrack={({ props, children }) =>
                        <RenderTrack props={props} children={children} value={age} min={0} max={100} />}
                    renderThumb={({ props, isDragged }) =>
                        <RenderThumb props={props} isDragged={isDragged} />}
                />
                { RangeLineAxis && <RangeLineAxis /> }
                <div className={classes.rangeOutput} id="output">
                    <Typography>
                        {age[0].toFixed(0)} - {age[1].toFixed(0)}
                    </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(RangeLine);
