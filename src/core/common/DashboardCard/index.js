import React from "react";
import get from "lodash/get";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ChevronRight from "@material-ui/icons/ChevronRight";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ItemsList from "./ItemsList";
import { SHOW_ALL } from "../../pages/PatientSummary/config";
import { themeCommonElements } from "../../../version/config/theme.config";

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
export default props => {
    const { id, classes, title, items, loading, icon, list, history, showMode, showHeadings } = props;
    if (Object.values(showHeadings).indexOf(list) === -1) {
        return null;
    }
    const isOldDesign = get(themeCommonElements, 'isOldDesign', false);
    const menuHasChevrons = get(themeCommonElements, 'menuHasChevrons', false);
    return (
        <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card className={classes.card}>
                <div id={id} className={classes.topBlock} aria-label={title} onClick={() => history.push('/' + list)}>
                    { !isOldDesign && <FontAwesomeIcon icon={icon} size="2x" className={classes.icon} /> }
                    <h1 className={classes.mainHeading}>
                        <Typography className={classes.title}>
                            {title}
                        </Typography>
                        { menuHasChevrons && <ChevronRight /> }
                    </h1>
                </div>
                { (showMode === SHOW_ALL || !showMode) &&
                <ListBlock loading={loading} classes={classes} items={items} list={list} history={history} />
                }
            </Card>
        </Grid>
    );
}
