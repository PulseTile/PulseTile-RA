import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    title: {
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 400,
    },
    expansionPanel: {
        height: "49px !important",
        '& > div': {
            minHeight: "49px !important",
        }
    },
    currentExpansionPanel: {
        border: `1px solid ${theme.palette.borderColor}`,
        margin: "0px !important",
        '& > div': {
            minHeight: "49px !important",
        }
    },
    expansionPanelSummary: {
        backgroundColor: theme.palette.mainColor,
        paddingLeft: 16,
        '& > div': {
            margin: "0px !important",
            marginTop: "0px",
            marginBottom: "0px",
        }
    },
    expandIcon: {
        color: theme.isOldDesign ? `${theme.palette.secondaryMainColor} !important` : `${theme.palette.paperColor} !important`,
        paddingLeft: 10,
        paddingRight: 10,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        height: 35,
    },
    expansionTypography: {
        color: "white",
        fontSize: 18,
        fontWeight: 700,
    },
    expansionPanelDetails: {
        display: "flex",
        flexDirection: "column",
        padding: 0,
    },
});

const CurrentSectionBlock = ({ classes, currentVersion, currentRow, currentSection, onRowClick, sectionsInfo, latestVersionInfo, toggleMode, isVersionInfo }) => {
    const SectionBlock = currentSection ? currentSection.component : null;
    return (
        <Grid item xs={12} sm={currentRow ? 6 : 12}>
            <SectionBlock
                currentRow={currentRow}
                title={currentSection.section}
                classes={classes}
                onRowClick={onRowClick}
                sectionsInfo={sectionsInfo}
                latestVersionInfo={latestVersionInfo}
                toggleMode={toggleMode}
                isVersionInfo={isVersionInfo}
            />
        </Grid>
    );
};

export default withStyles(styles)(CurrentSectionBlock);
