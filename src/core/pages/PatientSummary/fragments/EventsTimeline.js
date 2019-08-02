import React from "react";
import _ from "lodash";
import get from "lodash/get";
import moment from "moment";

import {
    Timeline,
    Content,
    ContentYear,
    ContentBody,
} from 'vertical-timeline-component-react';

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    timeline: {
        height: 500,
        overflowX: 'hidden',
        overflowY: 'auto',
        paddingLeft: 30,
        paddingTop: 15,
        '& .timeline__container__year': {
            marginRight: -20,
            zIndex: 10,
            color: theme.palette.mainColor,
        },
        '& .timeline__container__year:after': {
            background: 'none',
        },
        '& .timeline__container__body': {
            marginTop: 50,
            position: 'relative',
            '&:before': {
                backgroundColor: theme.palette.mainColor,
                width: 5,
                left: -6,
                content: '""',
                height: '100%',
                minHeight: '95%',
                position: 'absolute',
                top: 10,
            },
        },

    },
    eventBlock: {
        marginLeft: 30,
        marginTop: 25,
        textAlign: "center",
    },
    eventDate: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: '50%',
        textAlign: 'center',
        backgroundColor: theme.palette.mainColor,
        '& p': {
            color: theme.palette.paperColor,
        },
    },
    eventType: {
        color: theme.palette.mainColor,
        fontSize: 16,
        fontWeight: 700,
    },
    eventDescription: {
        border: `1px solid ${theme.palette.borderColor}`,
        backgroundColor: theme.palette.toolbarColor,
        padding: "10px 15px",
        borderRadius: 5,
    }
});

const CustomHeader = ({ classes, items }) => {

    const dateAndTime = items[0];
    const events = items[1];
    const dateForPoint = moment.unix(dateAndTime).format('Do MMM')

    // Use your own CSS
    return (
        <Content>
            <ContentYear year={<EventDate classes={classes} label={dateForPoint} />} />
            <ContentBody>
                {
                    events.map(item => {
                        return (
                            <div className={classes.eventBlock}>
                                <Typography variant="body1" className={classes.eventType}>{get(item, 'type', null)}</Typography>
                                <div className={classes.eventDescription}>
                                    <Typography variant="h1">{get(item, 'title', null)}</Typography>
                                    <Typography variant="caption">{get(item, 'dateAndTime', null)}</Typography>
                                </div>
                            </div>
                        )
                    })
                }

            </ContentBody>
        </Content>
    );
};

const EventDate = ({ classes, label }) => {
    const dateArray = label.split(' ');
    return (
        <div className={classes.eventDate}>
            <Typography variant="body1">{dateArray[0]}</Typography>
            <Typography variant="body1">{dateArray[1]}</Typography>
        </div>
    )
}
const EventsTimeline = ({ classes }) => {

    const events = [
        {
            date: 1559433600,
            type: 'Event',
            title: 'Appointment with Dr Jones',
            dateAndTime: '02-Jun-2019 at 13:30'
        },
        {
            date: 1559433600,
            type: 'Event',
            title: 'Appointment with Dr Smith',
            dateAndTime: '02-Jun-2019 at 15:30'
        },
        {
            date: 1559433600,
            type: 'Event',
            title: 'Appointment with Dr Taylor',
            dateAndTime: '02-Jun-2019 at 19:30'
        },
        {
            date: 1559520000,
            type: 'Event',
            title: 'Appointment with Dr Jones',
            dateAndTime: '03-Jun-2019 at 13:30'
        },
        {
            date: 1559692800,
            type: 'Event',
            title: 'Appointment with Dr Jones',
            dateAndTime: '05-Jun-2019 at 13:30'
        },
        {
            date: 1559692800,
            type: 'Event',
            title: 'Appointment with Dr Smith',
            dateAndTime: '05-Jun-2019 at 16:30'
        },
    ];

    const eventsGroupByDate = _.mapValues(_.groupBy(events, 'date'),
        clist => clist.map(event => _.omit(event, 'date')));

    const eventsGroupByDateArray = Object.entries(eventsGroupByDate);

    return (
        <div className={classes.timeline}>
            <Timeline>
                { eventsGroupByDateArray.map(item => {
                    return (
                        <CustomHeader classes={classes} items={item} />
                    )
                })}
                <Content>
                    <ContentYear />
                </Content>
            </Timeline>
        </div>
    );
};

export default withStyles(styles)(EventsTimeline);
