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
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressArrowsAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';

import EditFormToolbar from "../../common/Toolbars/EditFormToolbar";

const styles = theme => ({
    editBlock: {
        width: '100%',
        backgroundColor: theme.palette.paperColor,
        border: `1px solid ${theme.palette.borderColor}`,
    },
    blockTitle: {
        display: "flex",
        alignItems: "center",
        height: 49,
        backgroundColor: theme.palette.mainColor,
        paddingLeft: 15,
    },
    title: {
        color: theme.palette.paperColor,
        fontSize: 18,
        fontWeight: 700,
    },
    emptyBlock: {
        flexGrow: 1,
    },
    expandBlockIcon: {
        height: 20,
        paddingRight: 20,
        color: theme.palette.paperColor,
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
 * @param {shape}   classes
 * @param {boolean} isListOpened
 * @param {string}  blockTitle
 * @param {func}    toggleListBlock
 * @param {shape}   children
 * @param {func}    changeViewType
 * @param {shape}   rest
 * @constructor
 */
const EditTemplate = ({ classes, isListOpened, blockTitle, toggleListBlock, children, changeViewType, ...rest }) => (
    <Grid item xs={12} sm={isListOpened ? 6 : 12} className={classes.editBlock}>
        <div className={classes.blockTitle}>
            <Typography className={classes.title}>{blockTitle}</Typography>
            <div className={classes.emptyBlock}></div>
            <Tooltip title={isListOpened ? "Expand" : "Compress"}>
                <IconButton onClick={() => toggleListBlock()}>
                    <FontAwesomeIcon className={classes.expandBlockIcon} icon={isListOpened ? faExpandArrowsAlt : faCompressArrowsAlt} size="1x" />
                </IconButton>
            </Tooltip>
        </div>
        <Edit {...rest}>
            <SimpleForm className={classes.editForm} toolbar={<EditFormToolbar changeViewType={changeViewType} />}>
                {children}
            </SimpleForm>
        </Edit>
    </Grid>
);

export default withStyles(styles)(EditTemplate);
