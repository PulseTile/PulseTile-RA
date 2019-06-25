import React, { Component } from 'react';

import { Range } from "react-range";

import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
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
        background: `linear-gradient(160deg, ${theme.palette.mainColor} 50%, #fff 51%, ${theme.palette.mainColor} 50%)`
    },
    leftDescriptionBlock: {
        width: "25%",
        textAlign: "left",
        paddingLeft: 25,
    },
    rightDescriptionBlock: {
        width: "25%",
        textAlign: "right",
        paddingRight: 25,
    },
    rangeLine: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "2em",
    },
    leftText: {
        paddingTop: 5,
        paddingBottom: 5,
        color: theme.palette.fontColor,
    },
    text: {
        paddingTop: 5,
        paddingBottom: 5,
        color: theme.palette.paperColor,
    },
    formHelpText: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
        lineHeight: "1.3em",
    },
});

const RangeLine = ({ classes, onChangeRange, sourceName, title, helpTitle, leftText, rightText }) => (
    <React.Fragment>
        <FormControl className={classes.titleBlock}>
            <FormLabel className={classes.mainTitle}>{title}</FormLabel>
            <FormHelperText className={classes.formHelpText}>{helpTitle}</FormHelperText>
        </FormControl>
        <FormGroup>
            <div className={classes.descriptionBlock}>
                <div className={classes.leftDescriptionBlock}>
                    <Typography className={classes.leftText}>{leftText}</Typography>
                </div>
                <div className={classes.rightDescriptionBlock}>
                    <Typography className={classes.text}>{rightText}</Typography>
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
