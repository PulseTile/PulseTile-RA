import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

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
    if (items && items.length === 0) {
        return (
            <ListItem button divider>
                <ListItemText primary="No data" />
            </ListItem>
        );
    } else {
        return (
            <List className={classes.list}>
                {items.map((item, key) => {
                    const showRoute = "/" + list + "/" + item.sourceId + "/show";
                    return (
                        <ListItem key={key} button divider onClick={() => history.push(showRoute)}>
                            <Typography noWrap={true} className={classes.listItem}>
                                {item.text}
                            </Typography>
                        </ListItem>
                    );
                })}
            </List>
        );
    }
};

export default ItemsList;