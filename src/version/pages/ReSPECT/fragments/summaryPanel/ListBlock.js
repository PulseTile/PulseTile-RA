import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ChevronRight from "@material-ui/icons/ChevronRight";

import { versionsServerAction } from "../../../../actions/ReSPECT/versionsServerAction";
import { themeCommonElements } from "../../../../config/theme.config";

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

    redirectToRespect = (item) => {
        this.props.toggleRespectModal();
        this.props.history.push('/respect');
        this.props.getOneVersion(item.sourceId, item.version)
    };

    render() {
        const { classes, items, history, isLoading } = this.props;
        if (isLoading) {
            return (
                <List className={classes.list}>
                    <li className={classes.listItem}>
                        <Typography>Loading...</Typography>
                    </li>
                </List>
            );
        }
        if (items && items.length > 0) {
            const menuHasChevrons = get(themeCommonElements, 'menuHasChevrons', false);
            return (
                <List className={classes.list}>
                    {items && items.slice(0, 4).map((item, key) => {
                        return (
                            <li key={key} className={classes.listItem} onClick={() => this.redirectToRespect(item)}>
                                <Typography noWrap={true}>
                                    Version {item.version}
                                </Typography>
                                { menuHasChevrons && <ChevronRight /> }
                            </li>
                        );
                    })}
                </List>
            );
        } else {
            return (
                <List className={classes.list}>
                    <li className={classes.listItem} onClick={() => history.push('/respect')}>
                        <Typography>No versions</Typography>
                    </li>
                </List>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.custom.versionsServerInfo.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOneVersion(sourceId, version) {
            dispatch(versionsServerAction.requestOne(sourceId, version));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)( ItemsList);
