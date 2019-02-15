import React from "react";
import { connect } from 'react-redux';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
            </ListItem>
        </List>
    );
};

export default LoadingItems;
