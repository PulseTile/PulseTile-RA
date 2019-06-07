import React from "react";
import { TextInput, DateInput, LongTextInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from "@material-ui/core/FormGroup";

import formStyles from "../../../../core/config/formStyles";

/**
 * This component returns TopThreeThingsInputs creation/editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const TopThreeThingsInputs = ({ classes, ...rest }) => (
    <React.Fragment>

        <FormGroup className={classes.formGroup}>
            <TextInput
                source="name1"
                label="Issue #1"
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <LongTextInput
                source="description1"
                label="Description #1"
                rows={20}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customTextarea } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <TextInput
                source="name2"
                label="Issue #2"
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <LongTextInput
                source="description2"
                label="Description #2"
                rows={20}
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customTextarea } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <TextInput
                source="name3"
                label="Issue #3"
                fullWidth
                InputProps={{ disableUnderline: true, classes: { root: classes.customRoot, input: classes.customInput } }}
                InputLabelProps={{ shrink: true, className: classes.customFormLabel }}
            />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
            <LongTextInput
                source="description3"
                label="Description #3"
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

export default withStyles(formStyles)(TopThreeThingsInputs);
