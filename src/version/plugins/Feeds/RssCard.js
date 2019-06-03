import React from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import RssIcon from '@material-ui/icons/RssFeed';
import Grid from '@material-ui/core/Grid';

import ListBlock from "./ListBlock";
import { SHOW_ALL } from "../../../core/pages/PatientSummary/config";
import {themeCommonElements} from "../../config/theme.config";

const styles = theme => ({
    card: {
        borderRadius: 0,
    },
    media: {
        backgroundColor: theme.palette.mainColor,
    },
    container: {
        width: "100%",
        height: "100%",
        background: theme.patientSummaryPanel.container.background,
        backgroundSize: "cover",
    },
    topBlock: {
        display: "flex",
        flexDirection: "column",
        height: theme.isOldDesign ? 50 : 100,
        backgroundColor: theme.palette.tableHeadColor,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        border: theme.isOldDesign ? `1px solid ${theme.palette.borderColor}` : null,
        '&:hover': {
            cursor: "pointer",
        },
    },
    icon: {
        marginBottom: 10,
    },
    mainHeading: {
        margin: 0,
    },
    title: {
        marginBottom: 0,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        fontSize: 20,
        fontWeight: 800,
        zIndex: 99999999,
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
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
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
    const isOldDesign = get(themeCommonElements, 'isOldDesign', false);
    if (selectedFeeds.indexOf(sourceId) !== -1) {
        return (
            <Grid item xs={12} sm={6} md={6} lg={3}>
                <Card id={sourceId} className={classes.card} onClick={() => window.open(link, "_blank")}>
                    <div className={classes.topBlock}>
                        {!isOldDesign && <RssIcon className={classes.icon} />}
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
