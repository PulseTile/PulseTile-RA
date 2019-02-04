import React from "react";
import { get } from "lodash";
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


const FeedsPanels = ({ feeds, rssFeeds, showMode, showHeadings, loading  }) => {

    console.log('rssFeeds', rssFeeds);

    const rssFeedsArray = Object.entries(rssFeeds);
    const feedsArray = (feeds.length > 0) ? feeds.length : dummyFeeds;

    console.log('feedsArray', feedsArray);

    console.log('rssFeedsArray', rssFeedsArray);


    return rssFeedsArray.length > 0 ? rssFeedsArray.map(item => {
        const sourceId = item[0];
        const rssItems = item[1];

        const currentFeed = getCurrentFeedInfo(feedsArray, sourceId);

        console.log('sourceId', sourceId);
        console.log('items', rssItems);

        return (
            <RssCard
                key={key}
                showMode={showMode}
                showHeadings={showHeadings}
                id={item.id}
        title = {currentFeed.name
    }
        link = {currentFeed.landingPageUrl
    }
        loading = {loading}
        items = {rssItems}
        {...
            this.props
        }
        />
        )
        ;
    })
        : null;
};

const mapStateToProps = state => {
    return {
        feeds: state.custom.feedsList.data,
        rssFeeds: state.custom.feedsRss.data,
        loading: state.custom.patientInfo.loading,
        showMode: state.custom.showMode.data,
        showHeadings: state.custom.showHeadings.data,
    };
};

export default connect(mapStateToProps, null)(FeedsPanels);
