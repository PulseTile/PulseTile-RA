import React from "react";
import get from "lodash/get";

import { withStyles } from '@material-ui/core/styles';
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

import rangeLine from "../../../images/range-line.jpeg";

const styles = theme => ({
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
        backgroundColor: theme.palette.mainColor,
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
    }
});

const rangeLineSettings = {
    respirationRate: [
        { label: '≤ 8', position: 'rangeAxisItemTop' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '9-11', position: 'rangeAxisItemTop' },
        { label: '12-20', position: 'rangeAxisItemBottom' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '21-24', position: 'rangeAxisItemBottom' },
        { label: '≥ 25', position: 'rangeAxisItemTop' },
    ],
    heartRate: [
        { label: '≤ 40', position: 'rangeAxisItemTop' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '41-50', position: 'rangeAxisItemTop' },
        { label: '51-90', position: 'rangeAxisItemBottom' },
        { label: '91-110', position: 'rangeAxisItemTop' },
        { label: '111-130', position: 'rangeAxisItemBottom' },
        { label: '≥ 131', position: 'rangeAxisItemTop' },
    ],
    temperature: [
        { label: '≤ 35.0', position: 'rangeAxisItemTop' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '35.1-36.0', position: 'rangeAxisItemTop' },
        { label: '36.1-38.0', position: 'rangeAxisItemBottom' },
        { label: '38.1-39.0', position: 'rangeAxisItemTop' },
        { label: '≥ 39.1', position: 'rangeAxisItemBottom' },
        { label: null, position: 'rangeAxisItemTop' },
    ],
    systolicBP: [
        { label: '≤ 90', position: 'rangeAxisItemTop' },
        { label: '91-100', position: 'rangeAxisItemBottom' },
        { label: '101-110', position: 'rangeAxisItemTop' },
        { label: '111-219', position: 'rangeAxisItemBottom' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '≥ 220', position: 'rangeAxisItemTop' },
    ],
    oxygenSaturation: [
        { label: '≤ 91', position: 'rangeAxisItemTop' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '92-93', position: 'rangeAxisItemBottom' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '94-95', position: 'rangeAxisItemBottom' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '≥ 96', position: 'rangeAxisItemTop' }
    ]
};

const RangeLinePopover = ({ classes, anchorEl, open, handleClose, label, model }) => {
    const rangeLineValues = get(rangeLineSettings, model, null);
    return (
        <Popover
            open={open}
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
