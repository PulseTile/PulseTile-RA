import React from "react";
import { Toolbar, SaveButton, ListButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';

import CustomSaveButton from "../../common/Buttons/CustomSaveButton";

const styles = {
    listButton: {
        display: "block",
        width: "120px",
        height: "40px",
        paddingTop: "6px !important",
        paddingLeft: "8px !important",
        backgroundColor: "#da534f",
        color: "white",
        border: "1px solid " + "#da534f",
        borderRadius: "20px",
        fontSize: "16px",
        fontWeight: "800",
        "& svg": {
            marginRight: "2px"
        },
        "& span": {
            textTransform: "capitalize"
        },
        "&:hover": {
            backgroundColor: "white",
            color: "#da534f",
        }
    }
};

/**
 * This component returns toolbar without delete button for create forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const CreateFormToolbar = ({ classes, changeViewType, ...props}) => {
    return (
        <Toolbar {...props} >
            <ListButton label="Cancel" icon={<BlockIcon />} className={classes.listButton} />
            <CustomSaveButton />
        </Toolbar>
    );
}

export default withStyles(styles)(CreateFormToolbar);