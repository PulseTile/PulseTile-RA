import React, { Component } from 'react';

import { Range } from "react-range";

import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import RenderTrack from "./RenderTrack";
import RenderThumb from "./RenderThumb";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

const styles = theme => ({
    titleBlock: {
        paddingLeft: 25,
        paddingTop: 15,
        paddingBottom: 15,
    },
    mainTitle: {
        color: "#000",
        fontWeight: 800,
    },
    descriptionBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        background: `linear-gradient(160deg, ${theme.palette.mainColor} 50%, #fff 51%, #7cb4df 50%)`
    },
    leftDescriptionBlock: {
        width: "25%",
        color: "#fff",
        textAlign: "left",
        paddingLeft: 25,
    },
    rightDescriptionBlock: {
        width: "25%",
        color: "#fff",
        textAlign: "right",
        paddingRight: 25,
    },
    rangeLine: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "2em",
    },
});

const RangeLine = ({ classes, onChangeRange, sourceName, title, helpTitle, leftText, rightText }) => (
    <React.Fragment>
        <FormControl className={classes.titleBlock}>
            <FormLabel className={classes.mainTitle}>{title}</FormLabel>
            <FormHelperText>{helpTitle}</FormHelperText>
        </FormControl>
        <FormGroup>
            <div className={classes.descriptionBlock}>
                <div className={classes.leftDescriptionBlock}>
                    <p>{leftText}</p>
                </div>
                <div className={classes.rightDescriptionBlock}>
                    <p>{rightText}</p>
                </div>
            </div>
            <div className={classes.rangeLine}>
                <Range
                    values={sourceName} step={STEP} min={MIN} max={MAX} onChange={values => onChangeRange(values)}
                    renderTrack={({ props, children }) =>
                        <RenderTrack props={props} children={children} preferencesValue={sourceName} min={MIN} max={MAX} />}
                    renderThumb={({ props, isDragged }) =>
                        <RenderThumb props={props} isDragged={isDragged} />}
                />
            </div>
        </FormGroup>
    </React.Fragment>
);

export default withStyles(styles)(RangeLine);
