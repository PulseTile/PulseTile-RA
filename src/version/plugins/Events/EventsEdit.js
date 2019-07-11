import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Form from "./fragments/Form";

/**
 * This component returns block with edit form for Events
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const EventsEdit = props => (
    <EditTemplate isCustom={true} blockTitle="Event" {...props}>
        <Form {...props} />
    </EditTemplate>
);

export default EventsEdit;