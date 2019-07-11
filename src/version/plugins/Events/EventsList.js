import React from "react";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../../core/common/ResourseTemplates/ListTemplate";
import EventsCreate from "./EventsCreate";
import EventsEdit from "./EventsEdit";
import EventsShow from "./EventsShow";
import EventsTimeline from "./EventsTimeline";
import DatagridRow from "./fragments/DatagridRow";

/**
 * This component returns block with Events list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const EventsList = ({ classes, ...rest }) => (
    <ListTemplate
        create={EventsCreate}
        edit={EventsEdit}
        show={EventsShow}
        resourceUrl="events"
        title="Events"
        hasTimetable={true}
        timelineBlock={EventsTimeline}
        CustomRow={DatagridRow}
        isCustomDatagrid={true}
        {...rest}
    >
        <TextField label="Event Name" source="noteType" />
        <TextField label="Event Type" source="author" />
        <DateField label="Date" source="dateCreated" />
    </ListTemplate>
);

export default EventsList;
