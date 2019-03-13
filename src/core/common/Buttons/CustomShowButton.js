import React from "react";
import { ShowButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';

const styles = {
    showButton: {
        color: '#30ad57',
        fontSize: 16,
        textTransform: 'capitalize',
    },
};

/**
 * This component returns Show button with custom styles
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const CustomShowButton = ({ classes, ...rest }) => (
    <ShowButton label="View" icon={null} className={classes.showButton} {...rest} />
);

export default withStyles(styles)(CustomShowButton);
