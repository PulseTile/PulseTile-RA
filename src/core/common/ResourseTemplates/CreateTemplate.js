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

import CreateFormToolbar from "../../common/Toolbars/CreateFormToolbar";
import { MAIN_COLOR } from "../../config/styles";

const styles = {
    createBlock: {
        width: '100%',
        backgroundColor: "white",
        margin: "15px 15px 15px 0px",
    },
    blockTitle: {
        display: "flex",
        alignItems: "center",
        height: "49px",
        color: "white",
        backgroundColor: MAIN_COLOR,
        fontSize: "18px",
        fontWeight: "700",
        paddingLeft: "15px",
    },
    createForm: {
        '& > div': {
            paddingTop: "0px !important",
            paddingLeft: "10px !important",
            paddingRight: "10px !important",
        },
    },
};

/**
 * This component returns common template for plugin Create form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const CreateTemplate = ({ classes, children, ...rest }) => (
    <div className={classes.createBlock}>
        <Typography className={classes.blockTitle}>New Allergy</Typography>
        <Create redirect="show" title="New Allergy" {...rest}>
            <SimpleForm className={classes.createForm} toolbar={<CreateFormToolbar />}>
                {children}
            </SimpleForm>
        </Create>
    </div>
);

export default withStyles(styles)(CreateTemplate);
