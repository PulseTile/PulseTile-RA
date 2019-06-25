import React from "react";
import {
    Timeline,
    Content,
    ContentYear,
    ContentBody,
    Description
} from 'vertical-timeline-component-react';

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BackIcon from "@material-ui/icons/ArrowBack";

const styles = theme => ({
    eventBlock: {

    }
});

const CustomHeader = () => {

    // const { type, title, dateAndTime } = props.event;

    // Use your own CSS
    return (
        <Content>
            <ContentYear year="2018" />
            <ContentBody title="Amazing Title">
                <Description text="I'm an amazing event" optional="I'm an amazing optional text"/>
            </ContentBody>
        </Content>
    );
};

const EventsTimeline = ({ classes }) => {

    const events = [
        {
            date: new Date(2019, 5, 3),
            type: 'Event',
            title: 'Appointment with Dr Jones',
            dateAndTime: '03-May-2019 at 13:30'
        },
        {
            date: new Date(2019, 5, 3),
            type: 'Event',
            title: 'Appointment with Dr Jones',
            dateAndTime: '03-May-2019 at 13:30'
        },
        {
            date: new Date(2019, 5, 3),
            type: 'Event',
            title: 'Appointment with Dr Jones',
            dateAndTime: '03-May-2019 at 13:30'
        },
        {
            date: new Date(2019, 5, 10),
            type: 'Event',
            title: 'Appointment with Dr Jones',
            dateAndTime: '03-May-2019 at 13:30'
        },
        {
            date: new Date(2019, 5, 11),
            type: 'Event',
            title: 'Appointment with Dr Jones',
            dateAndTime: '03-May-2019 at 13:30'
        },
        {
            date: new Date(2019, 5, 11),
            type: 'Event',
            title: 'Appointment with Dr Jones',
            dateAndTime: '03-May-2019 at 13:30'
        },
    ];

    return (
        <Timeline>
            <Content>
                <ContentYear year="2018" />
                <ContentBody title="Amazing Title">
                    <Description text="I'm an amazing event" optional="I'm an amazing optional text"/>
                </ContentBody>
            </Content>
            <Content>
                <ContentYear year="2018" />
                <ContentBody title="Amazing Title">
                    <Description text="I'm an amazing event" optional="I'm an amazing optional text"/>
                </ContentBody>
            </Content>
            <Content>
                <ContentYear year="2018" />
                <ContentBody title="Amazing Title">
                    <Description text="I'm an amazing event" optional="I'm an amazing optional text"/>
                </ContentBody>
            </Content>
        </Timeline>
    );
};

export default withStyles(styles)(EventsTimeline);
