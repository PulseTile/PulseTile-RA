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
        minHeight: 302,
    },
    media: {
        backgroundColor: theme.patientSummaryPanel.media.backgroundColor,
    },
    container: {
        background: theme.patientSummaryPanel.container.background,
        backgroundSize: "cover",
    },
    topBlock: {
        display: "flex",
        flexDirection: "column",
        height: 100,
        backgroundColor: theme.patientSummaryPanel.topBlock.backgroundColor,
        background: theme.patientSummaryPanel.topBlock.background,
        backgroundSize: "cover",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
    },
    icon: {
        marginBottom: 10,
    },
    title: {
        marginBottom: 0,
    },
    list: {
        padding: 0,
        "& a": {
            textDecoration: "none",
        }
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
                        <RssIcon />
                        <Typography gutterBottom variant="h5" component="h3" className={classes.title} >
                            {title}
                        </Typography>
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
