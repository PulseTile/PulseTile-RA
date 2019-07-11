import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Form from "./fragments/Form";

/**
 * This component returns Events creation form
 */
const EventsCreate = props => (
    <CreateTemplate isCustom={true} blockTitle="Event" {...props}>
        <Form isCreate={true} {...props} />
    </CreateTemplate>
);

export default EventsCreate;
