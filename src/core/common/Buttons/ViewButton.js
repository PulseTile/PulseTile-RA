import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    viewButton: {
        textTransform: 'capitalize',
        border: theme.isShowcase ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        borderRadius: 0,
        '& span p': {
            fontSize: 16,
            color: theme.isShowcase ? theme.palette.secondaryMainColor : theme.palette.viewButton,
        }
    },
});

/**
 * This component returns Show button with custom styles
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func}  viewAction
 * @param {shape} record
 */
const ViewButton = ({ classes, viewAction, record }) => (
    <Button aria-label="View" onClick={e => viewAction(e, record)} className={classes.viewButton}>
        <Typography>View</Typography>
    </Button>
);

export default withStyles(styles)(ViewButton);