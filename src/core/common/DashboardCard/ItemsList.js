import React from "react";
import { connect } from 'react-redux';

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

/**
 * This component returns synopsis list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  classes
 * @param {array}  items
 * @param {string} list
 * @param {shape}  history
 * @constructor
 */
const ItemsList = ({ classes, items, list, history }) => {
    if (items && items.length === 0) {
        return (
            <li className={classes.listItem}>
                <Typography>No data</Typography>
            </li>
        );
    } else {
        return (
            <List className={classes.list}>
                {items.map((item, key) => {
                    const showRoute = "/" + list + "/" + item.sourceId + "/show";
                    return (
                        <li key={key} className={classes.listItem} onClick={() => history.push(showRoute)}>
                            <Typography noWrap={true}>
                                {item.text}
                            </Typography>
                        </li>
                    );
                })}
            </List>
        );
    }
};

export default ItemsList;