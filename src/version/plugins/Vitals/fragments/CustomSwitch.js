import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
    switchBase: {
        color: theme.palette.mainColor,
        '&$checked': {
            color: theme.palette.mainColor,
        },
        '&$checked + $track': {
            color: theme.palette.mainColor,
        },
    },
    checked: {
        color: theme.palette.mainColor,
    },
});

export default withStyles(styles)(Switch);