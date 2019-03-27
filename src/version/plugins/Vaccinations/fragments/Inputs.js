import React from "react";
import { DisabledInput, TextInput, DateInput, LongTextInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns Vaccinations creation/editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const VaccinationsCreate = ({ classes, ...rest }) => (
    <React.Fragment>
        <TextInput className={classes.labelBlock} source="vaccinationName" label="Name" fullWidth />
        <DateInput className={classes.labelBlock} source="vaccinationDateTime" label="Vaccination date" fullWidth />
        <TextInput className={classes.labelBlock} source="series" label="Series" fullWidth />
        <LongTextInput className={classes.labelBlock} source="comment" label="Comment" fullWidth />
        <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
    </React.Fragment>
);

export default withStyles(styles)(VaccinationsCreate);
