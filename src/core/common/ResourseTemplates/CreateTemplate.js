import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    DateInput,
    DisabledInput,
    LongTextInput,
} from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import CreateFormToolbar from "../../common/Toolbars/CreateFormToolbar";

const styles = theme => ({
    createBlock: {
        width: '100%',
        backgroundColor: "white",
    },
    blockTitle: {
        display: "flex",
        alignItems: "center",
        height: 49,
        color: "white",
        backgroundColor: theme.templates.createTemplate.blockTitle.backgroundColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
    },
    createForm: {
        '& > div': {
            paddingTop: 0,
            paddingLeft: 10,
            paddingRight: 10,
        },
    },
});

/**
 * This component returns common template for plugin Create form
 * (it used in Create blocks for the plugins Allergies, Contacts, Medications, Problems etc.)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  classes
 * @param {string} blockTitle
 * @param {shape}  children
 * @param {shape}  rest
 */
const CreateTemplate = ({ classes, blockTitle, children, ...rest }) => (
    <Grid item xs={12} sm={6} className={classes.createBlock}>
        <Typography className={classes.blockTitle}>{blockTitle}</Typography>
        <Create {...rest}>
            <SimpleForm className={classes.createForm} toolbar={<CreateFormToolbar />}>
                {children}
            </SimpleForm>
        </Create>
    </Grid>
);

export default withStyles(styles)(CreateTemplate);
