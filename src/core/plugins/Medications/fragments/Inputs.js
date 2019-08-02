import React from "react";
import { DateInput, SelectInput, LongTextInput, TextInput, DisabledInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';

import formStyles from "../../../config/formStyles";
import { routesArray } from "./selects";
import FormGroup from "@material-ui/core/FormGroup";
import {relationshipArray} from "../../Contacts/fragments/selects";

/**
 * This component returns fields for Medications creation/editing forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const MedicationsInputs = ({ classes, ...rest }) => (
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
                source="route"
                label="Route"
                choices={routesArray}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customSelector } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <LongTextInput
                source="doseAmount"
                label="Dose Amount"
                rows={20}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customTextarea } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <LongTextInput
                source="doseDirections"
                label="Dose Description"
                rows={20}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customTextarea } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <LongTextInput
                source="doseTiming"
                label="Dose Timing"
                rows={20}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customTextarea } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <TextInput
                source="medicationCode"
                label="Medication Description"
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <DateInput
                source="startDate"
                label="Start date"
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <TextInput
                source="author"
                label="Author"
                fullWidth
                defaultValue={localStorage.getItem('username')}
                disabled={true}
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <DateInput
                source="dateCreated"
                label="Date"
                fullWidth
                defaultValue={moment().format('MM/DD/YYYY')}
                disabled={true}
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

    </React.Fragment>
);

export default withStyles(formStyles)(MedicationsInputs);
