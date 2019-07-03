import React from "react";
import { TextInput, DateInput, LongTextInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from "@material-ui/core/FormGroup";

import formStyles from "../../../config/formStyles";

/**
 * This component returns inputs for Allergies creation/editing forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const AllergiesInputs = ({ classes }) => (
    <React.Fragment>
        <FormGroup className={classes.formGroup}>
            <TextInput
                source="cause"
                label="Cause"
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>
        <FormGroup className={classes.formGroup}>
            <LongTextInput
                source="reaction"
                label="Reaction / Description"
                rows={20}
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customTextarea } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>
        <FormGroup className={classes.formGroup}>
            <TextInput
                source="causeCode"
                label="Terminology"
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>
        <FormGroup className={classes.formGroup}>
            <TextInput
                source="causeTerminology"
                label="Terminology Code"
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>
        <FormGroup className={classes.formGroup}>
            <TextInput
                source="author"
                label="Author"
                defaultValue={localStorage.getItem('username')}
                disabled={true}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>
        <FormGroup className={classes.formGroup}>
            <DateInput
                className={classes.labelBlock}
                source="dateCreated"
                label="Date"
                defaultValue={moment().format('MM/DD/YYYY')}
                disabled={true}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>
    </React.Fragment>
);

export default withStyles(formStyles)(AllergiesInputs);
