import React from "react";
import { Toolbar, SaveButton } from "react-admin";

import CancelButton from "../Buttons/CancelButton";
import CustomSaveButton from "../Buttons/CustomSaveButton";

/**
 * This component returns custom toolbar for edit form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const EditToolbar = ({ changeViewType, ...props }) => {
    return (
        <Toolbar {...props} >
            <CancelButton redirectTo={changeViewType} />
            <CustomSaveButton {...props} />
        </Toolbar>
    );
};

export default EditToolbar;
