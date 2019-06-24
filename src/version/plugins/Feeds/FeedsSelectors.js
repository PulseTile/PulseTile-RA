import React, { Component } from "react";
import { connect } from 'react-redux';

import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';

import { feedsListAction } from "../../actions/feedsListAction";
import { setSelectedFeedsAction } from "../../actions/setSelectedFeedsAction";
import { feedsRssAction } from "../../actions/feedsRssAction";

import dummyFeeds from "./dummyFeeds";

/**
 * This component returns selectors for Feeds
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class FeedsSelectors extends Component {

    state = {
        selectedFeeds: this.props.selectedFeeds ? Object.values(this.props.selectedFeeds) : [],
    };

    componentDidMount() {
        this.props.getUserFeeds();
    };

    /**
     * This function checks is current Feed was selected
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {string} sourceId
     * @return {boolean}
     */
    isFeedsChecked = sourceId => {
        const { selectedFeeds } = this.state;
        return selectedFeeds.indexOf(sourceId) !== -1;
    };

    isFeedsPresented = item => {
        return (Object.values(this.props.selectedFeeds).indexOf(item.sourceId) !== -1);
    };

    /**
     * This function toggle Feeds visibility
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {shape} item
     */
    toggleVisibility = item => {
        this.setState((state, props) => {
                const { selectedFeeds } = props;
                let feedsArray = selectedFeeds;
                if (this.isFeedsPresented(item)) {
                    let index = selectedFeeds.indexOf(item.sourceId);
                    feedsArray.splice(index, 1);
                } else {
                    feedsArray.push(item.sourceId);
                }
                return {
                    selectedFeeds: feedsArray,
                };
            },
            () => {
                if (this.isFeedsPresented(item)) {
                    this.props.getRssData(item.sourceId, item.rssFeedUrl);
                }
                this.props.setSelectedFeeds(this.state.selectedFeeds)
            }
        );
    };

    render() {
        const { classes, feeds } = this.props;
        const feedsArray = (feeds && feeds.length > 0) ? feeds : dummyFeeds;
        return (
            <React.Fragment>
                <Typography>FEEDS</Typography>
                <Divider />
                <div className={classes.dialogItem}>
                {feedsArray.map((item, key) => (
                    <div key={key} className={classes.dialogLabel}>
                        <Checkbox
                            className={classes.checkbox}
                            checked={this.isFeedsChecked(item.sourceId)}
                            color="primary"
                            onChange={() => this.toggleVisibility(item)}
                            classes={{ root: classes.radio, checked: classes.checked }}
                        />
                        <Typography className={classes.checkboxLabel}>{item.name}</Typography>
                    </div>
                ))}
                </div>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => ({
    feeds: state.custom.feedsList.data,
    selectedFeeds: state.custom.selectedFeedsList.data,
});

const mapDispatchToProps = dispatch => ({
    getUserFeeds() {
        dispatch(feedsListAction.request());
    },
    setSelectedFeeds(feeds) {
        dispatch(setSelectedFeedsAction(feeds));
    },
    getRssData(sourceId, rssFeedUrl) {
        dispatch(feedsRssAction.request(sourceId, rssFeedUrl));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedsSelectors);
