import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    viewButton: {
        color: theme.palette.viewButton,
        fontSize: 16,
        textTransform: 'capitalize',
    },
});

/**
 * This component returns Show button with custom styles
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func}  viewAction
 */
const ViewButton = ({ classes, viewAction }) => (
    <Button onClick={(e, userId) => viewAction(e, userId)} className={classes.viewButton}>
        <Typography className={classes.viewButton}>View</Typography>
    </Button>
);

export default withStyles(styles)(ViewButton);