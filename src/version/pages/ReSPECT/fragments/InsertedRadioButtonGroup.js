import React from "react";
import { RadioButtonGroupInput } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const styles = theme => ({
    formGroup: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    formLabel: {
        display: "block",
        color: theme.palette.fontColor,
        fontSize: 14,
        marginBottom: 5,
    },
    formLabelVersion: {
        display: "block",
        color: "#bebebe",
        fontSize: 14,
        marginBottom: 5,
    },
    formInput: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
    },
    formTextarea: {
        width: '98%',
        height: 180,
        padding: 10,
    },
    formHelpText: {
        marginBottom: 5,
    },
    radioGroup: {
        marginLeft: 25,
        marginBottom: 25,
    },
});

const InsertedRadioButtonGroup = ({ classes, isSelected, variant, handleChange, isVersionInfo }) => {
    return (
        <React.Fragment>
            <FormLabel className={isVersionInfo ? classes.formLabelVersion : classes.formLabel}>
                C - This person is less than 16 (Scotland) / 18 (UK)
            </FormLabel>
            { isSelected &&
                <RadioGroup name="nonSelectABCreason" className={classes.radioGroup} value={variant} onChange={e => handleChange(e)}>
                    <FormHelperText>
                        Please select 1 or 2, and also 3 as applicable or explain in section D below.
                    </FormHelperText>
                    <FormControlLabel
                        value="valueSetC1"
                        control={<Radio />}
                        disabled={isVersionInfo}
                        label="1 - They have sufficient maturity and understanding to participate in making this plan."
                    />
                    <FormControlLabel
                        value="valueSetC2"
                        control={<Radio />}
                        disabled={isVersionInfo}
                        label="2 - They do not have sufficient maturity and understanding to participate in making this plan. Their views, when known, have been taken into account."
                    />
                    <FormControlLabel
                        value="valueSetC3"
                        control={<Radio />}
                        disabled={isVersionInfo}
                        label="3 - Those holding parental responsibility have been fully involved in discussing and making this plan."
                    />
                </RadioGroup>
            }
        </React.Fragment>
    )
};

export default withStyles(styles)(InsertedRadioButtonGroup);
