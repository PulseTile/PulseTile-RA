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
 * This component returns block with Events details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const EventsShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Event" {...rest}>
        <TextField className={classes.labelBlock} source="name" label="Event Name" />
        <TextField className={classes.labelBlock} source="type" label="Event Type" />
        <TextField className={classes.labelBlock} source="description" label="Notes" />
        <DateField className={classes.labelBlock} source="dateTime" label="Event Date" showTime />
    </ShowTemplate>
);

export default withStyles(styles)(EventsShow);