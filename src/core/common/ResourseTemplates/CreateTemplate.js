import React from "react";
import { Create, SimpleForm } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import CreateFormToolbar from "../../common/Toolbars/CreateFormToolbar";
import CustomIcon from "../CustomIcon";

const styles = theme => ({
    blockTitle: {
        display: "flex",
        alignItems: "center",
        height: 49,
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
    createForm: {
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
 * This component returns common template for plugin Create form
 * (it used in Create blocks for the plugins Allergies, Contacts, Medications, Problems etc.)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   classes
 * @param {boolean} isCustom
 * @param {boolean} isListOpened
 * @param {func}    toggleListBlock
 * @param {string}  blockTitle
 * @param {shape}   children
 * @param {shape}   rest
 */
const CreateTemplate = ({ classes, isCustom, isListOpened, toggleListBlock, blockTitle, children, ...rest }) => (
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
                <Create {...rest}>
                    <SimpleForm className={classes.createForm} toolbar={<CreateFormToolbar />}>
                        {children}
                    </SimpleForm>
                </Create>
            :
            <div className={classes.customFormBlock}>
                {children}
            </div>
        }
    </Grid>
);

export default withStyles(styles)(CreateTemplate);
