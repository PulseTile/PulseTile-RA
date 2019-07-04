import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
    switchBase: {
        '&$checked': {
            '& + $bar': {
                backgroundColor: theme.palette.secondaryMainColor,
            },
        },
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.sharp,
        }),
    },
    bar: {
        borderRadius: 0,
        width: 54,
        height: 30,
        marginTop: -13,
        marginLeft: -21,
        border: `1px solid ${theme.palette.borderColor}`,
        backgroundColor: theme.palette.mainColor,
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    icon: {
        width: 24,
        height: 24,
        borderRadius: 0,
        marginTop: 4,
        backgroundColor: theme.palette.paperColor,
    },
    iconChecked: {
        boxShadow: theme.shadows[1],
        borderRadius: 0,
        marginLeft: 20,
        backgroundColor: theme.palette.paperColor,
    },
    checked: {
        transform: 'translateX(15px)',
        '& + $bar': {
            opacity: 1,
            border: 'none',
        },
    },
});

export default withStyles(styles)(Switch);