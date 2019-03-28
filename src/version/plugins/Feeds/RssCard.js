import React from "react";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import RssIcon from '@material-ui/icons/RssFeed';
import Grid from '@material-ui/core/Grid';

import ListBlock from "./ListBlock";
import { SHOW_ALL } from "../../../core/pages/PatientSummary/config";

const styles = theme => ({
    card: {
        borderRadius: 0,
    },
    media: {
        backgroundColor: theme.palette.mainColor,
    },
    container: {
        background: theme.patientSummaryPanel.topBlock.background,
        backgroundSize: "cover",
    },
    topBlock: {
        display: "flex",
        flexDirection: "column",
        height: 100,
        backgroundColor: theme.palette.mainColor,
        background: theme.patientSummaryPanel.topBlock.background,
        backgroundSize: "cover",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        '&:hover': {
            cursor: "pointer",
        }
    },
    icon: {
        marginBottom: 10,
    },
    mainHeading: {
        margin: 0,
    },
    title: {
        marginBottom: 0,
        color: "#fff",
        fontSize: 20,
        fontWeight: 800,
    },
    list: {
        padding: 0,
        "& a": {
            textDecoration: "none",
        }
    },
    listItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 48,
        paddingLeft: 15,
        fontSize: "1rem",
        borderLeft: "1px solid #e5e5e5",
        borderRight: "1px solid #e5e5e5",
        borderBottom: "1px solid #e5e5e5",
    },
    feedsItem: {
        fontSize: "1rem",
    }
});

/**
 * This component returns one single Feeds RSS Card
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param props
 * @constructor
 */
const RssCard = props => {
    const { classes, sourceId, title, items, loading, icon, link, history, showMode, showHeadings, selectedFeeds } = props;
    if (selectedFeeds.indexOf(sourceId) !== -1) {
        return (
            <Grid item xs={12} sm={6} md={6} lg={3}>
                <Card id={sourceId} className={classes.card} onClick={() => window.open(link, "_blank")}>
                    <div className={classes.topBlock}>
                        <RssIcon className={classes.icon} />
                        <h1 className={classes.mainHeading}>
                            <Typography gutterBottom className={classes.title} >
                                {title}
                            </Typography>
                        </h1>
                    </div>
                    { (showMode === SHOW_ALL || !showMode) &&
                    <ListBlock loading={loading} classes={classes} items={items} history={history} />
                    }
                </Card>
            </Grid>
        );
    }
    return null;
};

const mapStateToProps = state => {
    return {
        selectedFeeds: state.custom.selectedFeedsList.data,
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(RssCard));
