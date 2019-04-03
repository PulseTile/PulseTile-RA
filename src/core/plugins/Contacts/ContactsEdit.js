import React from "react";

import EditTemplate from "../../common/ResourseTemplates/EditTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns Contacts editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ContactsEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Contact" {...rest}>
        <Inputs />
    </EditTemplate>
);

export default ContactsEdit;
