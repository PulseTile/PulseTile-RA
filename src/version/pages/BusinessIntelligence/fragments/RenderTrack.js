import React from "react";
import { getTrackBackground } from "react-range/lib/index";

import { withStyles } from '@material-ui/core/styles/index';

const styles = {
    mainBlock: {
        height: 36,
        display: "flex",
        width: "100%"
    }
};

const RenderTrack = ({ classes, props, children, value, min, max }) => {
    return (
        <div onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} className={classes.mainBlock}>
            <div
                ref={props.ref}
                style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                        values: value,
                        colors: ["#ccc", "#ff5d00", "#ccc"],
                        min: min,
                        max: max
                    }),
                    alignSelf: "center"
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default withStyles(styles)(RenderTrack);