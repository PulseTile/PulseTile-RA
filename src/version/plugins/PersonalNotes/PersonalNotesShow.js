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
 * This component returns block with Personal Notes details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const PersonalNotesShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Procedure" {...rest}>
        <TextField className={classes.labelBlock} source="noteType" label="Type" />
        <TextField className={classes.labelBlock} source="notes" label="Note" />
        <TextField className={classes.labelBlock} source="author" label="Author" />
    </ShowTemplate>
);

export default withStyles(styles)(PersonalNotesShow);