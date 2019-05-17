import React from "react";
import { DisabledInput, TextInput, DateInput, LongTextInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import EditTemplate from "../../../../core/common/ResourseTemplates/EditTemplate";

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns TopThreeThingsInputs creation/editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const TopThreeThingsInputs = ({ classes, ...rest }) => (
    <React.Fragment>
        <TextInput id="name1" className={classes.labelBlock}  source="name1" label="Issue #1" />
        <LongTextInput id="description1" className={classes.labelBlock} source="description1" label="Description #1" fullWidth />
        <TextInput id="name2" className={classes.labelBlock}  source="name2" label="Issue #2" />
        <LongTextInput id="description2" className={classes.labelBlock} source="description2" label="Description #2" fullWidth />
        <TextInput id="name3" className={classes.labelBlock}  source="name3" label="Issue #3" />
        <LongTextInput id="description3" className={classes.labelBlock} source="description3" label="Description #3" fullWidth />
        <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
    </React.Fragment>
);

export default withStyles(styles)(TopThreeThingsInputs);
