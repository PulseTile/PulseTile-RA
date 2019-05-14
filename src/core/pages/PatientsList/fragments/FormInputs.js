import React from "react";
import { TextInput, DateInput, RadioButtonGroupInput } from "react-admin";

import { withStyles } from '@material-ui/core/styles';

const genderChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
];

const styles = {
    halfWidthBlock: {
        width: "auto !important",
    },
    halfWidth: {
        display: "inline-block",
        width: "50% !important",
    },
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

const FormInputs = ({ classes, ...rest }) => {
    return (
        <React.Fragment>
            <TextInput {...rest} source="prefix" label="Preferred Name" fullWidth />
            <div className={classes.halfWidthBlock}>
                <TextInput className={classes.halfWidth} source="firstName" label="Name" />
                <TextInput className={classes.halfWidth} source="lastName" label="Surname" />
            </div>
            <DateInput source="birthDate" label="Born" fullWidth />
            <RadioButtonGroupInput source="gender" label="Gender" choices={genderChoices} />
            <TextInput source="address" label="Address" fullWidth />
            <div className={classes.halfWidthBlock}>
                <TextInput className={classes.halfWidth} source="city" label="City" />
                <TextInput className={classes.halfWidth} source="district" label="District" />
            </div>
            <div className={classes.halfWidthBlock}>
                <TextInput className={classes.halfWidth} source="postCode" label="Post Code" />
                <TextInput className={classes.halfWidth} source="country" label="Country" />
            </div>
            <TextInput source="phone" label="Telephone Number" fullWidth />
            <TextInput source="nhsNumber" label="NHS Number" fullWidth />
        </React.Fragment>
    );
};

export default withStyles(styles)(FormInputs);