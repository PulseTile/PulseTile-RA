import React from "react";
import { TextInput, SelectInput, BooleanInput, DateInput, LongTextInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import { relationshipArray, relationshipTypeArray } from "./selects";
import FormGroup from "@material-ui/core/FormGroup";

import formStyles from "../../../config/formStyles";

/**
 * This component returns inputs for Contacts creation/editing forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ContactsInputs = ({ classes, ...rest }) => (
    <React.Fragment>
        <FormGroup className={classes.formGroup}>
            <TextInput
                source="name"
                label="Name"
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <SelectInput
                source="relationship"
                label="Relationship"
                choices={relationshipArray}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customSelector } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <SelectInput
                source="relationshipCode"
                label="Relationship Type"
                choices={relationshipTypeArray}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customSelector } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <TextInput
                source="relationshipTerminology"
                label="Relationship Terminology"
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <BooleanInput
                label="Next of Kin"
                source="nextOfKin"
                fullWidth
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <LongTextInput
                source="contactInformation"
                label="Contact Information"
                rows={20}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customTextarea } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <LongTextInput
                source="notes"
                label="Note"
                rows={20}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customTextarea } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <TextInput
                source="author"
                label="Author"
                fullWidth
                defaultValue={localStorage.getItem('username')}
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
                disabled={true}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <DateInput
                source="dateSubmitted"
                label="Date"
                fullWidth
                defaultValue={moment().format('MM/DD/YYYY')}
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
                disabled={true}
            />
        </FormGroup>

    </React.Fragment>
);

export default withStyles(formStyles)(ContactsInputs);
