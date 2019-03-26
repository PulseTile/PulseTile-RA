import React from "react";

import CreateTemplate from "../../common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns Contacts creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ContactsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Contact" {...rest}>
        <Inputs />
    </CreateTemplate>
);

export default ContactsCreate;
