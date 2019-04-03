import React from "react";
import { TextField, DateField } from "react-admin";
import { withStyles } from '@material-ui/core/styles';

import PulseTileCommon from "pulsetile-ra-common";

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
const AllergiesShow = ({ classes, ...rest }) => {
    const { ShowTemplate } = PulseTileCommon;
    return (
        <ShowTemplate pageTitle="Allergy" {...rest}>
            <TextField className={classes.labelBlock} label="Cause" source="cause" />
            <TextField className={classes.labelBlock} label="Reaction / Description" source="reaction" />
            <TextField className={classes.labelBlock} label="Author" source="author" />
            <DateField className={classes.labelBlock} label="Date" source="dateCreated" />
        </ShowTemplate>
    );
};

export default withStyles(styles)(AllergiesShow);
