import React from "react";
import get from "lodash/get";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ItemsList from "./ItemsList";
import { SHOW_ALL } from "../../pages/PatientSummary/config";
import { themeCommonElements } from "../../../version/config/theme.config";

const styles = theme => ({
    card: {
        borderRadius: 0,
    },
    media: {
        backgroundColor: theme.palette.mainColor,
    },
    topBlock: {
        display: "flex",
        flexDirection: "column",
        height: theme.isOldDesign ? 50 : 100,
        backgroundColor: theme.palette.mainColor,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        border: theme.isOldDesign ? `1px solid ${theme.palette.borderColor}` : null,
        '&:hover': {
            cursor: "pointer",
        },
    },
    title: {
        marginBottom: 0,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        fontSize: 20,
        fontWeight: 800,
        zIndex: 99999999,
    },
    icon: {
        marginBottom: 10,
        zIndex: 99999999,
    },
    mainHeading: {
        margin: 0,
        zIndex: 99999999,
    },
    list: {
        padding: 0,
        zIndex: 99999999,
    },
    listItemNoData: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 48,
        paddingLeft: 15,
        zIndex: 99999999,
        fontSize: "1rem",
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
    listItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 48,
        paddingLeft: 15,
        zIndex: 99999999,
        fontSize: "1rem",
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
        cursor: "pointer",
        '&:hover': {
            backgroundColor: theme.palette.secondaryMainColor,
            '& p': {
                color: theme.palette.paperColor,
            }
        }
    },
    emptyRows: {
        height: 150,
        zIndex: 99999999,
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
});

/**
 * This component returns list of empty rows if information is loading
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 */
const LoadingItems = ({ classes }) => {
    return (
        <List className={classes.list}>
            <li className={classes.listItemNoData}>
                <Typography>Loading...</Typography>
            </li>
            <div className={classes.emptyRows}></div>
        </List>
    );
};

/**
 * This component returns list block
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   classes
 * @param {array}   items
 * @param {shape}   list
 * @param {shape}   history
 */
const ListBlock = ({ classes, items, list, history }) => {
    if (items) {
        return (
            <ItemsList classes={classes} items={items} list={list} history={history} />
        );
    }
    return (
        <LoadingItems classes={classes} />
    );
};

/**
 * This component returns one single Dashboard Card
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param props
 * @constructor
 */
const DashboardCardRoll = props => {
    const { id, classes, title, items, loading, icon, list, history, showMode, showHeadings } = props;
    if (Object.values(showHeadings).indexOf(list) === -1) {
        return null;
    }
    const isOldDesign = get(themeCommonElements, 'isOldDesign', false);
    return (
        <Grid item xs={12} sm={6} md={6} lg={4}>
            <Card className={classes.card}>
                <div id={id} className={classes.topBlock} aria-label={title} onClick={() => history.push('/' + list)}>
                    { !isOldDesign && <FontAwesomeIcon icon={icon} size="2x" className={classes.icon} /> }
                    <h1 className={classes.mainHeading}>
                        <Typography className={classes.title}>
                            {title}
                        </Typography>
                    </h1>
                </div>
                { (showMode === SHOW_ALL || !showMode) &&
                <ListBlock loading={loading} classes={classes} items={items} list={list} history={history} />
                }
            </Card>
        </Grid>
    );
}

export default withStyles(styles)(DashboardCardRoll);
