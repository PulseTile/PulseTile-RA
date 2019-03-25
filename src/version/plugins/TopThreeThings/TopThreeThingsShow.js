import React from "react";
import { TextField, DateField } from "react-admin";
import { withStyles } from '@material-ui/core/styles';

import ShowTemplate from "../../../core/common/ResourseTemplates/ShowTemplate";

const styles = {
    labelBlock: {
        '& > div': {
            marginTop: "0px !important",
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns block with Allergies details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const TopThreeThingsShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Top Three Things" {...rest}>
        <TextField className={classes.labelBlock}  source="name1" label="Issue #1" />
        <TextField className={classes.labelBlock}  source="description1" label="Description #1" />
        <TextField className={classes.labelBlock}  source="name2" label="Issue #2" />
        <TextField className={classes.labelBlock}  source="description2" label="Description #2" />
        <TextField className={classes.labelBlock}  source="name3" label="Issue #3" />
        <TextField className={classes.labelBlock}  source="description3" label="Description #3" />
    </ShowTemplate>
);

export default withStyles(styles)(TopThreeThingsShow);
