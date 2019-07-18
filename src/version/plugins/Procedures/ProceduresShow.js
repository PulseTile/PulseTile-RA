import React from "react";
import { TextField, DateField } from "react-admin";
import { withStyles } from '@material-ui/core/styles';

import ShowTemplate from "../../../core/common/ResourseTemplates/ShowTemplate";

const styles = {
    labelBlock: {
        '& > div': {
            marginTop: "0px !important",
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns block with Procedure details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const ProceduresShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Procedure" {...rest}>
        <TextField className={classes.labelBlock} source="procedureName" label="Procedure name" />
        <DateField className={classes.labelBlock} source="date" label="Date of Procedure" />
        <TextField className={classes.labelBlock} source="performer" label="Procedure Performed By" />
        <TextField className={classes.labelBlock} source="notes" label="Procedure Notes" />
        <TextField className={classes.labelBlock} source="procedureTerminology" label="Terminology" />
        <TextField className={classes.labelBlock} source="procedureCode" label="Code" />
        <TextField className={classes.labelBlock} source="author" label="Author" />
    </ShowTemplate>
);

export default withStyles(styles)(ProceduresShow);