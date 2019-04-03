import React from "react";
import { connect } from 'react-redux';

import dummyFeeds from "./dummyFeeds";
import RssCard from "./RssCard";

function getCurrentFeedInfo(feedsArray, sourceId) {
    let result = null;
    feedsArray.forEach(item => {
        if (item.sourceId === sourceId) {
            result = item;
        }
    });
    return result;
}

/**
 * This component returns set of Feeds panels
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   feeds
 * @param {shape}   rssFeeds
 * @param {string}  showMode
 * @param {shape}   showHeadings
 * @param {boolean} loading
 */
const FeedsPanels = ({ feeds, rssFeeds, showMode, showHeadings, loading }) => {
    const rssFeedsArray = Object.entries(rssFeeds);
    const feedsArray = (feeds && feeds.length > 0) ? feeds : dummyFeeds;
    return rssFeedsArray.length > 0 ? rssFeedsArray.map((item, key) => {
        const sourceId = item[0];
        const rssItems = item[1];
        const currentFeed = getCurrentFeedInfo(feedsArray, sourceId);
        return (
            <RssCard
                key={key}
                showMode={showMode}
                showHeadings={showHeadings}
                sourceId={sourceId}
                title={currentFeed.name}
                link={currentFeed.landingPageUrl}
                loading={loading}
                items={rssItems}
                {...this.props}
            />
        );
    })
    : null;
};

const mapStateToProps = state => {
    return {
        feeds: state.custom.feedsList.data,
        rssFeeds: state.custom.feedsRss.data,
        loading: state.custom.demographics.loading,
        showMode: state.custom.showMode.data,
        showHeadings: state.custom.showHeadings.data,
    };
};

export default connect(mapStateToProps, null)(FeedsPanels);
