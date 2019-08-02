import React from "react";
import get from "lodash/get";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";

import ItemsList from "./ItemsList";
import DummyItemsList from "./DummyItemsList";
import { SHOW_ALL } from "../../pages/PatientSummary/config";

const styles = theme => ({
    card: {
        borderRadius: 0,
    },
    topBlock: {
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderLeft: `0.5px solid ${theme.palette.paperColor}`,
        borderRight: `0.5px solid ${theme.palette.paperColor}`,
        backgroundColor: theme.palette.tableHeadColor,
        position: "relative",
        color: theme.palette.fontColor,
        '&:hover': {
            cursor: "pointer",
        },
    },
    synopsisTitle: {
        marginBottom: 0,
        backgroundColor: theme.palette.tableHeadColor,
        color: theme.palette.fontColor,
        fontSize: 18,
        fontWeight: 600,
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "justify",
        height: 48,
        paddingLeft: 15,
        paddingRight: 15,
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

const dummyItems = {
    problems: ['Overweight', 'Type 2 diabetic', 'Hypertensive'],
    medications: ['Metformin', 'Gloposode', 'Statins'],
    allergies: ['Latex', '', ''],
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
        // return (
        //     <ItemsList classes={classes} items={items} list={list} history={history} />
        // );
        return (
            <DummyItemsList classes={classes} items={dummyItems[list]} list={list} history={history} />
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
    return (
        <Grid item xs={12} sm={6} md={6} lg={4}>
            <Card className={classes.card}>
                <div className={classes.topBlock} aria-label={title} onClick={() => history.push('/' + list)}>
                    <Typography className={classes.synopsisTitle}>
                        {title}
                    </Typography>
                </div>
                { (showMode === SHOW_ALL || !showMode) &&
                    <ListBlock loading={loading} classes={classes} items={items} list={list} history={history} />
                }
            </Card>
        </Grid>
    );
}

export default withStyles(styles)(DashboardCardRoll);
