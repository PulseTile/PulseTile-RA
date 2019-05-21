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
 * This component returns block with Vitals details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const VitalsShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Vitals" {...rest}>
        <TextField className={classes.labelBlock} source="vaccinationName" label="Vaccination name" />
        <TextField className={classes.labelBlock} source="comment" label="Comment" />
        <TextField className={classes.labelBlock} source="author" label="Author" />
        <DateField className={classes.labelBlock} source="vaccinationDateTime" label="Date" />
    </ShowTemplate>
);

export default VitalsShow;