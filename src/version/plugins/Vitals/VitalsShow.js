import React from "react";
import { TextField, DateField } from "react-admin";
import { withStyles } from '@material-ui/core/styles';

import ShowTemplate from "../../../core/common/ResourseTemplates/ShowTemplate";
import FormLabel from "@material-ui/core/FormLabel";

const styles = {
    labelBlock: {
        '& > div': {
            marginTop: "0px !important",
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns block with Vitals details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const VitalsShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Vitals" {...rest}>
        <TextField className={classes.labelBlock} source="respirationRate" label="Respiration rate, resps/min" />
        <TextField className={classes.labelBlock} source="oxygenSaturation" label="Oxygen Saturation, %" />
        <TextField className={classes.labelBlock} source="heartRate" label="Heart Rate, bpm" />
        <TextField className={classes.labelBlock} source="systolicBP" label="Systolic BP, mmHg" />
        <TextField className={classes.labelBlock} source="diastolicBP" label="Diastolic BP, mmHg" />
        <TextField className={classes.labelBlock} source="levelOfConsciousness" label="Level of Consciousness" />
        <TextField className={classes.labelBlock} source="temperature" label="Temperature, C" />
        <TextField className={classes.labelBlock} source="newsScore" label="NEWS Score" />
        <TextField className={classes.labelBlock} source="author" label="Author" />
        <DateField className={classes.labelBlock} source="dateCreate" label="Date" />
    </ShowTemplate>
);

export default VitalsShow;