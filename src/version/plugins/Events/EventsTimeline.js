import React from "react";
import _ from "lodash";
import get from "lodash/get";
import moment from "moment";
import { connect } from 'react-redux';
import { Toolbar } from "react-admin";

import {
    Timeline,
    Content,
    ContentYear,
    ContentBody,
} from 'vertical-timeline-component-react';

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import CreateButton from "../../../core/common/Buttons/CreateButton";

const styles = theme => ({
    timeline: {
        overflowX: 'hidden',
        overflowY: 'auto',
        paddingLeft: 30,
        paddingTop: 15,
        backgroundColor: theme.palette.paperColor,
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
        cursor: 'pointer',
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
    eventTitle: {
        marginBottom: 5,
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
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 0,
    }
});

const CustomHeader = ({ classes, items, history }) => {

    const dateAndTime = items[0];
    const events = items[1];
    const dateForPoint = moment.unix(dateAndTime).format('Do MMM')

    return (
        <Content>
            <ContentYear year={<EventDate classes={classes} label={dateForPoint} />} />
            <ContentBody>
                {
                    events.map(item => {
                        let eventRoute = '/events/' + get(item, 'sourceId', null);
                        let dateTime = moment(get(item, 'dateTime', null)).format('DD-MM-YYYY HH:mm');
                        return (
                            <div className={classes.eventBlock} onClick={() => history.push(eventRoute)}>
                                <Typography variant="body1" className={classes.eventType}>{get(item, 'type', null)}</Typography>
                                <div className={classes.eventDescription}>
                                    <Typography className={classes.eventTitle} variant="h1">{get(item, 'name', null)}</Typography>
                                    <Typography variant="caption">{dateTime}</Typography>
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

const EventsTimeline = ({ classes, eventsList, history, createUrl }) => {

    const eventsGroupByDate = _.mapValues(_.groupBy(eventsList, 'dateCreated'),
        clist => clist.map(event => _.omit(event, 'date')));

    const eventsGroupByDateArray = Object.entries(eventsGroupByDate);

    return (
        <React.Fragment>
        <div className={classes.timeline}>
            <Timeline>
                { eventsGroupByDateArray.map(item => {
                    return (
                        <CustomHeader classes={classes} items={item} history={history} />
                    )
                })}
                <Content>
                    <ContentYear />
                </Content>
            </Timeline>
        </div>
        {
            createUrl &&
                <Toolbar className={classes.toolbar}>
                    <CreateButton history={history} redirectPath={createUrl} />
                </Toolbar>
        }
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        eventsList: get(state, 'admin.resources.events.data', []),
    };
};


export default connect(mapStateToProps, null)(withStyles(styles)(EventsTimeline));
