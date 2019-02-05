import React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    DisabledInput,
    DateInput,
    LongTextInput
} from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import EditFormToolbar from "../../common/Toolbars/EditFormToolbar";

const styles = theme => ({
    editBlock: {
        width: '100%',
        backgroundColor: "white",
        margin: "15px 15px 15px 0px",
    },
    blockTitle: {
        display: "flex",
        alignItems: "center",
        height: 49,
        color: "white",
        backgroundColor: theme.templates.editTemplate.blockTitle.backgroundColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
    },
    editForm: {
        '& > div': {
            paddingTop: 0,
            paddingLeft: 10,
            paddingRight: 10,
        },
    },
});

/**
 * This component returns block with template for plugin edit form
 * (it used in Edit blocks for the plugins Allergies, Contacts, Medications, Problems etc.)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func}  changeViewType
 * @param {shape} rest
 * @constructor
 */
const EditTemplate = ({ classes, blockTitle, children, changeViewType, ...rest }) => (
    <div className={classes.editBlock}>
        <Typography className={classes.blockTitle}>{blockTitle}</Typography>
        <Edit {...rest}>
            <SimpleForm className={classes.editForm} toolbar={<EditFormToolbar changeViewType={changeViewType} />}>
                {children}
            </SimpleForm>
        </Edit>
    </div>
);

export default withStyles(styles)(EditTemplate);
