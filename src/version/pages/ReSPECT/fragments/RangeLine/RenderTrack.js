import React from "react";
import { getTrackBackground } from "react-range";

import { withStyles } from '@material-ui/core/styles';

const styles = {
    mainBlock: {
        height: 36,
        display: "flex",
        width: "100%"
    }
};

const RenderTrack = ({ classes, props, children, preferencesValue, min, max }) => {
    return (
        <div onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} className={classes.mainBlock}>
            <div
                ref={props.ref}
                style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                        values: preferencesValue,
                        colors: ["#ff5d00", "#ccc"],
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
