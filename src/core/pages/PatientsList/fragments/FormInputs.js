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
                <TextInput {...rest} className={classes.halfWidth} source="firstName" label="Name" />
                <TextInput {...rest} className={classes.halfWidth} source="lastName" label="Surname" />
            </div>
            <DateInput {...rest} source="birthDate" label="Born" options={{ format: 'DD-MM-YYYY' }} fullWidth />
            <RadioButtonGroupInput {...rest} source="gender" label="Gender" choices={genderChoices} />
            <TextInput {...rest} source="address" label="Address" fullWidth />
            <div className={classes.halfWidthBlock}>
                <TextInput {...rest} className={classes.halfWidth} source="city" label="City" />
                <TextInput {...rest} className={classes.halfWidth} source="district" label="District" />
            </div>
            <div className={classes.halfWidthBlock}>
                <TextInput {...rest} className={classes.halfWidth} source="postCode" label="Post Code" />
                <TextInput {...rest} className={classes.halfWidth} source="country" label="Country" />
            </div>
            <TextInput {...rest} source="phone" label="Telephone Number" fullWidth />
            <TextInput {...rest} source="nhsNumber" label="CHI Number" fullWidth />
        </React.Fragment>
    );
};

export default withStyles(styles)(FormInputs);