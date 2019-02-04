import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

/**
 * This component returns synopsis list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {array}  items
 * @constructor
 */
const ItemsList = ({ classes, items }) => {
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
                    return (
                        <a href={item.link} target="_blank">
                            <ListItem key={key} button divider>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        </a>
                    );
                })}
            </List>
        );
    }
};

export default ItemsList;