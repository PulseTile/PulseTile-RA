import React from "react";
import { TextField, DateField } from "react-admin";
import { withStyles } from '@material-ui/core/styles';

import ResultsShowTemplate from "./templates/ResultsShowTemplate";

const styles = {
    labelBlock: {
        '& > div': {
            marginTop: "0px !important",
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns block with Results details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const ResultsShow = ({ classes, ...rest }) => (
    <ResultsShowTemplate pageTitle="Results" notEdit={true} {...rest}>
        <TextField className={classes.labelBlock} source="testName" label="Test name" />
        <TextField className={classes.labelBlock} source="status" label="Status" />
        <DateField className={classes.labelBlock} source="sampleTaken" label="Sample Taken" />
        <TextField className={classes.labelBlock} source="conclusion" label="Conclusion" />
        <TextField className={classes.labelBlock} source="author" label="Author" />
        <DateField className={classes.labelBlock} source="dateCreated" label="Date" />
        <TextField className={classes.labelBlock} source="source" label="Source" />
    </ResultsShowTemplate>
);

export default withStyles(styles)(ResultsShow);