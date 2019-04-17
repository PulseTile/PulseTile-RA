import React, { Component } from "react";
import { connect } from 'react-redux';

import List from "@material-ui/core/List";
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
                            <li key={key} className={classes.listItem} onClick={() => this.redirectToRespect()}>
                                <Typography noWrap={true}>
                                    Version {item.version}
                                </Typography>
                            </li>
                        );
                    })}
                </List>
            );
        } else {
            return (
                <List className={classes.list}>
                    <li className={classes.listItem} onClick={() => this.redirectToRespect()}>
                        <Typography>No versions</Typography>
                    </li>
                    <div className={classes.emptyRows}></div>
                </List>
            );
        }
    }
}

export default ItemsList;
