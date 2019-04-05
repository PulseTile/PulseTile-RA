import React from "react";

import List from "@material-ui/core/List";
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
            <li className={classes.listItem}>
                <Typography>No data</Typography>
            </li>
        );
    }
    return (
        <List className={classes.list}>
            {items.slice(0, 4).map((item, key) => (
                    <a href={item.link} key={key} target="_blank">
                        <li key={key} className={classes.listItem}>
                            <Typography noWrap={true}>
                                {item.title}
                            </Typography>
                        </li>
                    </a>
                )
            )}
        </List>
    );
};

export default ItemsList;