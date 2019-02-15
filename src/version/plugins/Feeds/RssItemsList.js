import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

/**
 * This component returns synopsis list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {array} items
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
                {items.slice(0, 4).map((item, key) => (
                        <a href={item.link} target="_blank">
                            <ListItem key={key} button divider>
                                <Typography noWrap={true} className={classes.feedsItem}>
                                    {item.title}
                                </Typography>
                            </ListItem>
                        </a>
                    )
                )}
            </List>
        );
    }
};

export default ItemsList;