import React from "react";

import PulseTileCommon from "pulsetile-ra-common";
import Inputs from "./fragments/Inputs";

/**
 * This component returns Allergies creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 */
const AllergiesCreate = props => {
    const { CreateTemplate } = PulseTileCommon;
    return (
        <CreateTemplate blockTitle="Allergy" {...props}>
            <Inputs />
        </CreateTemplate>
    )
};

export default AllergiesCreate;
