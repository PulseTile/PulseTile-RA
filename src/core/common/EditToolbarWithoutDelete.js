import React from "react";
import { Toolbar, SaveButton } from "react-admin";

import CancelButton from "./Buttons/CancelButton";
import CustomSaveButton from "../common/Buttons/CustomSaveButton";

/**
 * This component returns toolbar without delete button for edit forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const EditToolbar = ({ changeViewType, ...props}) => {
    return (
        <Toolbar {...props} >
            <CancelButton onClickFunction={changeViewType} />
            <CustomSaveButton />
        </Toolbar>
    );
}

export default EditToolbar;
