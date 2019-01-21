import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
    if (items.length === 0) {
        return (
            <ListItem button divider>
                <ListItemText primary="No data" />
            </ListItem>
        );
    } else {
        return (
            <List className={classes.list}>
                {items.slice(0, 4).map((item, key) => {
                    const showRoute = "/" + list + "/" + item.sourceId + "/show";
                    return (
                        <ListItem key={key} button divider onClick={() => history.push(showRoute)}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    );
                })}
            </List>
        );
    }
};

export default ItemsList;