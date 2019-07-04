import React from "react";
import get from "lodash/get";

import { withStyles } from '@material-ui/core/styles';
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

import rangeLine from "../../../images/range-line.jpeg";
import { rangeLineSettings } from "./settings";

const styles = theme => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        display: "block",
        width: 490,
        padding: 0,
        margin: 0,
        borderRadius: 0,
    },
    blockTitle: {
        display: "flex",
        alignItems: "center",
        height: 49,
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.secondaryMainColor,
        paddingLeft: 15,
    },
    title: {
        color: theme.palette.paperColor,
        fontSize: 18,
        fontWeight: 700,
    },
    rangeAxisItemTop: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: 70,
        height: 65,
        float: "left"
    },
    rangeAxisItemBottom: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: 70,
        height: 65,
        float: "left"
    },
    content: {
        margin: 10,
        height: 60,
    },
    axis: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundImage: `url(${rangeLine})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: '490px 10px',
    },
});

const RangeLinePopover = ({ classes, anchorEl, open, handleClose, label, model }) => {
    const rangeLineValues = get(rangeLineSettings, model, null);
    return (
        <Popover
            open={open}
            className={classes.popover}
            classes={{ paper: classes.paper }}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        >
            <div>
                <div className={classes.blockTitle}>
                    <Typography className={classes.title}>{label}</Typography>
                </div>
                <div className={classes.content}>
                    <div className={classes.axis}>
                        {
                            rangeLineValues && rangeLineValues.map(item => {
                                return (
                                    <div className={classes[item.position]}>
                                        <Typography variant="body2">{item.label}</Typography>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </Popover>
    );
};

export default withStyles(styles)(RangeLinePopover);
