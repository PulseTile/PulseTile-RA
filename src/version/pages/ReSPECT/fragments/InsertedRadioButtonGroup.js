import React from "react";
import { RadioButtonGroupInput } from "react-admin";

import { withStyles } from '@material-ui/core/styles';

const styles = {
    mainLabel: {
        display: "block",
        marginTop: 15,
    },
    secondaryLabel: {
        display: "block",
        fontSize: 12,
    },
};

const InsertedRadioButtonGroup = ({ classes, label, secondaryLabel, sourceName, isSelected, choices }) => {
    return (
        <React.Fragment>
            <label className={classes.mainLabel}>{label}</label>
            { isSelected &&
                <RadioButtonGroupInput
                    source={sourceName}
                    label={secondaryLabel}
                    choices={choices}
                    fullWidth
                />
            }
        </React.Fragment>
    )
};

export default withStyles(styles)(InsertedRadioButtonGroup);
