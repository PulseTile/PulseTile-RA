import React from "react";
import get from "lodash/get";
import { translate } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { themeCommonElements } from "../../version/config/theme.config";
import { totalSynopsisData } from "../pages/PatientSummary/config";

const isTableHeaderInverted = get(themeCommonElements, 'invertedTableHeaders', false);

const styles = theme => ({
    tableHeaderBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        background: theme.tableHeader.tableHeaderBlock.background,
        backgroundSize: "cover",
        color: theme.palette.paperColor,
        padding: 15,
    },
    mainHeader: {
        margin: 0,
    },
    title: {
        marginTop: 0,
        color: isTableHeaderInverted ? theme.palette.fontColor : theme.palette.paperColor,
        fontSize: 24,
        fontWeight: 800,
    },
    description: {
        color: isTableHeaderInverted ? theme.palette.fontColor : theme.palette.paperColor,
        fontSize: 15,
    },
    icon: {
        color: theme.palette.mainColor,
        marginRight: 15,
    },
});

function getCurrentPlugin(resource) {
    let result = null;
    for (let i = 0, n = totalSynopsisData.length; i < n; i++) {
        let item = totalSynopsisData[i];
        if (item.list === resource) {
            result = item;
            break;
        }
    }
    return result;
}

/**
 * This component returns header for table
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  classes
 * @param {string} resource
 * @param {func}   translate
 */
const TableHeader = ({ classes, resource, translate }) => {
    const plugin = getCurrentPlugin(resource);
    const title = get(plugin, 'title', null);
    const description = get(plugin, 'description', null);
    const icon = get(plugin, 'icon', null);
    return (
        <div className={classes.tableHeaderBlock} >
            { (isTableHeaderInverted && icon) && <FontAwesomeIcon icon={icon} size="3x" className={classes.icon} /> }
            <div>
                <h1 className={classes.mainHeader}>
                    <Typography className={classes.title}>{title}</Typography>
                </h1>
                <Typography className={classes.description}>{description}</Typography>
            </div>
        </div>
    );
};

export default withStyles(styles)(translate(TableHeader));