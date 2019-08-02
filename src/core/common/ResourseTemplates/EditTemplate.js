import React from "react";
import { Edit, SimpleForm } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import EditFormToolbar from "../../common/Toolbars/EditFormToolbar";
import CustomIcon from "../CustomIcon";

const styles = theme => ({
    blockTitle: {
        display: "flex",
        alignItems: "center",
        height: 49,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        paddingLeft: 15,
    },
    title: {
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        fontSize: 18,
        fontWeight: 700,
    },
    emptyBlock: {
        flexGrow: 1,
    },
    expandBlockIcon: {
        height: 35,
        paddingLeft: 10,
        paddingRight: 10,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        color: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.paperColor,
    },
    editForm: {
        '& > div': {
            paddingTop: '0px !important',
            paddingLeft: 10,
            paddingRight: 10,
            border: `1px solid ${theme.palette.borderColor}`
        },
    },
    customFormBlock: {
        backgroundColor: theme.palette.paperColor,
        border: `1px solid ${theme.palette.borderColor}`
    },
});

/**
 * This component returns block with template for plugin edit form
 * (it used in Edit blocks for the plugins Allergies, Contacts, Medications, Problems etc.)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   classes
 * @param {boolean} isCustom
 * @param {boolean} isListOpened
 * @param {string}  blockTitle
 * @param {func}    toggleListBlock
 * @param {shape}   children
 * @param {func}    changeViewType
 * @param {shape}   rest
 * @constructor
 */
const EditTemplate = ({ classes, isCustom, isListOpened, blockTitle, toggleListBlock, children, changeViewType, ...rest }) => (
    <Grid item xs={12} sm={isListOpened ? 6 : 12}>
        <div className={classes.blockTitle}>
            <Typography className={classes.title}>{blockTitle}</Typography>
            <div className={classes.emptyBlock}></div>
            <Tooltip title={isListOpened ? "Expand" : "Compress"}>
                <IconButton onClick={e => toggleListBlock(e)}>
                    <CustomIcon iconClassName={isListOpened ? 'fa fa-expand' : 'fa fa-compress'} />
                </IconButton>
            </Tooltip>
        </div>
        { !isCustom
            ?
                <Edit undoable={false} {...rest}>
                    <SimpleForm id="form" className={classes.editForm} toolbar={<EditFormToolbar changeViewType={changeViewType} />}>
                        {children}
                    </SimpleForm>
                </Edit>
            :
                <div className={classes.customFormBlock}>
                    {children}
                </div>
        }
    </Grid>
);

export default withStyles(styles)(EditTemplate);
