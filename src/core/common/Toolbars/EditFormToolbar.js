import React from "react";
import { Toolbar } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import CancelButton from "../Buttons/CancelButton";
import CustomSaveButton from "../Buttons/CustomSaveButton";

const styles = theme => ({
    toolbar: {
        backgroundColor: theme.palette.toolbarColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    }
});

/**
 * This component returns custom toolbar for edit form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func}  changeViewType
 * @param {shape} props
 * @constructor
 */
const EditToolbar = ({ classes, changeViewType, ...props }) => {
    return (
        <Toolbar className={classes.toolbar} {...props} >
            <CancelButton redirectTo={changeViewType} />
            <CustomSaveButton {...props} />
        </Toolbar>
    );
};

export default withStyles(styles)(EditToolbar);
