import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    title: {
        color: "#fff",
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
    },
    expansionPanel: {
        height: "49px !important",
        '& > div': {
            minHeight: "49px !important",
        }
    },
    currentExpansionPanel: {
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
        color: "white",
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
        marginBottom: 10,
    },
});

const CurrentSectionBlock = ({ classes, currentRow, currentSection, onRowClick, sectionsInfo, latestVersionInfo, toggleMode, isVersionInfo }) => {
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
