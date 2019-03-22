import React, { Component } from "react";
import { connect } from 'react-redux';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

/**
 * This component returns synopsis list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  classes
 * @param {array}  items
 * @param {shape}  history
 * @constructor
 */
class ItemsList extends Component {

    redirectToRespect = () => {
        this.props.toggleRespectModal();
        this.props.history.push('/respect');
    };

    render() {
        const { classes, items } = this.props;
        if (items && items.length > 0) {
            return (
                <List className={classes.list}>
                    {items.map((item, key) => {
                        return (
                            <ListItem key={key} button divider>
                                <Typography noWrap={true} className={classes.listItem}>
                                    Version {key + 1}
                                </Typography>
                            </ListItem>
                        );
                    })}
                </List>
            );
        } else {
            return (
                <ListItem button divider onClick={() => this.redirectToRespect()}>
                    <ListItemText primary="No versions"/>
                </ListItem>
            );
        }
    }
}

export default ItemsList;
