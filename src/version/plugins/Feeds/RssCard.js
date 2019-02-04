import React from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { withStyles } from "@material-ui/core/styles";
import RssIcon from '@material-ui/icons/RssFeed';

import ItemsList from "./RssItemsList";
import { SHOW_ALL } from "../../../core/pages/PatientSummary/config";

/**
 * This component returns list of empty rows if information is loading
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
const LoadingItems = ({ classes }) => {
    return (
        <List className={classes.list}>
            <ListItem button divider>
                <ListItemText primary="Loading..." />
                <ListItemText primary="" />
                <ListItemText primary="" />
                <ListItemText primary="" />
            </ListItem>
        </List>
    );
}

/**
 * This component returns list block
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {boolean} loading
 * @param {shape}   classes
 * @param {array}   items
 * @param {shape}   list
 * @param {shape}   history
 */
const ListBlock = ({ loading, classes, items, history }) => {
    if (loading) {
        return (
            <LoadingItems classes={classes} />
    );
    }
    return (
        <ItemsList classes={classes} items={items} history={history} />
    );
};

const styles = theme => ({
    card: {
        display: "inline-block",
        width: "calc(25% - 20px)",
        float: "left",
        margin: "10px",
        padding: "5px",
        boxSizing: "border-box"
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
        height: "100px",
        backgroundColor: theme.patientSummaryPanel.topBlock.backgroundColor,
        background: theme.patientSummaryPanel.topBlock.background,
        backgroundSize: "cover",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
    },
    icon: {
        marginBottom: "10px",
    },
    title: {
        marginBottom: 0,
    },
    list: {
        padding: 0,
    },
});

/**
 * This component returns one single Dashboard Card
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param props
 * @constructor
 */
const RssCard = props => {
    const { classes, id, title, items, loading, icon, link, history, showMode, showHeadings } = props;
    // if (Object.values(showHeadings).indexOf(list) === -1) {
    //     return null;
    // }
    return (
        <Card id={id} className={classes.card}>
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
    );
}

export default withStyles(styles)(RssCard);