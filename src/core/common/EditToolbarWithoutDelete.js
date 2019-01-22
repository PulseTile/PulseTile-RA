import React from "react";
import { Toolbar, SaveButton } from "react-admin";

/**
 * This component returns toolbar without delete button for edit forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const EditToolbar = ({...props}) => {
    return (
        <Toolbar {...props} >
            <SaveButton />
        </Toolbar>
    );
}

export default EditToolbar;
