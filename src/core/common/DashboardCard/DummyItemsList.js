import React from "react";
import get from "lodash/get";

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ChevronRight from "@material-ui/icons/ChevronRight";

import { themeCommonElements } from "../../../version/config/theme.config";

const DummyItemsList = ({ classes, items, list, history }) => {
    const menuHasChevrons = get(themeCommonElements, 'menuHasChevrons', false);

    return (
        <List className={classes.list}>
            {items.slice(0).map((item, key) => {
                return (
                        <li key={key} className={classes.listItem}>
                            <Typography noWrap={true}>
                                {item}
                            </Typography>
                            { (menuHasChevrons && item) && <ChevronRight /> }
                        </li>
                    );
                })
            }
        </List>
    )
};

export default DummyItemsList;