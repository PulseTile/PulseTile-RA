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
 * This component returns block with MDT details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const MdtShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="MDT" {...rest}>
        <TextField className={classes.labelBlock} source="serviceTeam" label="Service / Team" />
        <DateField className={classes.labelBlock} source="dateOfRequest" label="Date of Request" />
        <DateField className={classes.labelBlock} source="dateOfMeeting" label="Date of Meeting" />
        <TextField className={classes.labelBlock} source="servicePageLink" label="Link to MDT Web Service Directory" />
        <TextField className={classes.labelBlock} source="question" label="Question For MDT" />
        <TextField className={classes.labelBlock} source="notes" label="Meeting Discussion" />
    </ShowTemplate>
);

export default withStyles(styles)(MdtShow);