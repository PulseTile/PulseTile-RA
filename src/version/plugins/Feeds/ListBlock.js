import React from "react";

import ItemsList from "./RssItemsList";
import LoadingItems from "./LoadingItems";

/**
 * This component returns list block
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {boolean} loading
 * @param {shape}   classes
 * @param {array}   items
 * @param {shape}   history
 */
const ListBlock = ({ loading, classes, items, history }) => {
    if (loading) {
        return (
            <LoadingItems classes={classes} />
        );
    }
    return (
        <ItemsList classes={classes} items={items} history={history} />
    );
};

export default ListBlock;
