import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * This component returns synopsis list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {array}  items
 * @param {string} list
 * @param {shape} history
 * @constructor
 */
const ItemsList = ({ classes, items, list, history }) => {
    if (items.length > 0) {
        return (
            <List className={classes.list}>
                {items.slice(0, 4).map((item, key) => {
                    const showRoute = "/" + list + "/" + item.sourceId + "/show";
                    return (
                        <ListItem button divider onClick={() => history.push(showRoute)}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    );
                })}
            </List>
        );
    } else {
        return (
            <ListItem button divider>
                <ListItemText primary="No data" />
            </ListItem>
        );
    }
}

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
 * This component returns one single Dashboard Card
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param props
 * @constructor
 */
export default props => {
    const { classes, title, items, loading, icon, list, history } = props;
    return (
        <Card className={classes.card}>
            <div className={classes.topBlock}>
                <FontAwesomeIcon icon={icon} size="2x" className={classes.icon} />
                <Typography gutterBottom variant="h5" component="h3" className={classes.title} >
                    {title}
                </Typography>
            </div>
            { loading ? <LoadingItems classes={classes} /> : <ItemsList classes={classes} items={items} list={list} history={history} /> }
        </Card>
    );
}
