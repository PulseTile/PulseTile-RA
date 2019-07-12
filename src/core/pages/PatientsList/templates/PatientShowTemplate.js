import React, { Component } from "react";
import get from "lodash/get";
import { Show, SimpleShowLayout, TextField } from "react-admin";

import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index';
import Typography from '@material-ui/core/Typography/index';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/index';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/index';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/index';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton/index';

import EditButton from "../../../common/Buttons/EditButton";
import CustomIcon from "../../../common/CustomIcon";
import EmergencySummaryPanel from "../fragments/EmergencySummaryPanel";
import { themeCommonElements } from "../../../../version/config/theme.config";

const styles = theme => ({
    expansionPanel: {
        height: "49px !important",
        border: `1px solid ${theme.palette.borderColor}`,
        '& > div': {
            minHeight: "49px !important",
        }
    },
    currentExpansionPanel: {
        margin: "0px !important",
        border: `1px solid ${theme.palette.borderColor}`,
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
    emptyBlock: {
        flexGrow: 1,
    },
    expandIcon: {
        height: 35,
        paddingLeft: 10,
        paddingRight: 10,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        color: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.paperColor,
    },
    expandBlockIcon: {
        height: 35,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 35,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        color: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.paperColor,
    },
    expansionTypography: {
        paddingTop: 10,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        fontSize: 18,
        fontWeight: 700,
    },
    expansionPanelDetails: {
        display: "flex",
        flexDirection: "column",
        padding: 0,
    },
    showDetails: {
        padding: '10px 0',
        '& > div': {
            boxShadow: "none",
        }
    },
    showLayoutDetails: {
        paddingTop: '0px !important',
        paddingLeft: 10,
    },
    labelBlock: {
        '& > div': {
            marginTop: 0,
            marginBottom: 0,
        },
    },
});

/**
 * This component returns template for details block
 * (it used in Show details blocks for the plugins Allergies, Contacts, Medications, Problems etc.)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class ShowTemplate extends Component {

    state = {
        isMainPanelOpen: true,
        isSystemInfoPanelOpen: true,
    };

    toggleMainPanel = () => {
        this.setState({
            isMainPanelOpen: !this.state.isMainPanelOpen,
        });
    };

    toggleSystemInfoPanel = () => {
        this.setState({
            isSystemInfoPanelOpen: !this.state.isSystemInfoPanelOpen,
        });
    };

    render() {
        const { classes, children, isListOpened, pageTitle, toggleListBlock, changeViewType, isDateCreatedAbsent, isSystemInfoAbsent, ...rest } = this.props;
        const { isMainPanelOpen, isSystemInfoPanelOpen } = this.state;
        const hasEmergencySummaryPanel = get(themeCommonElements, 'emergencySummaryPanel', false);
        return (
            <Grid item xs={12} sm={isListOpened ? 6 : 12}>
                <ExpansionPanel className={isMainPanelOpen ? classes.currentExpansionPanel : classes.expansionPanel} expanded={isMainPanelOpen} onChange={() => this.toggleMainPanel()}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                        <Typography className={classes.expansionTypography} >{pageTitle}</Typography>
                        <div className={classes.emptyBlock}></div>
                        <div title={isListOpened ? "Expand" : "Compress"}>
                            <IconButton onClick={e => toggleListBlock(e)}>
                                <CustomIcon iconClassName={isListOpened ? 'fa fa-expand' : 'fa fa-compress'} />
                            </IconButton>
                        </div>
                    </ExpansionPanelSummary>
                    {
                        isMainPanelOpen &&
                        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                            <Show className={classes.showDetails} title={pageTitle} {...rest}>
                                <SimpleShowLayout className={classes.showLayoutDetails}>
                                    {children}
                                </SimpleShowLayout>
                            </Show>
                            <EditButton redirectTo={changeViewType} />
                        </ExpansionPanelDetails>
                    }
                </ExpansionPanel>
                <ExpansionPanel className={isSystemInfoPanelOpen ? classes.currentExpansionPanel : classes.expansionPanel} expanded={isSystemInfoPanelOpen} onChange={() => this.toggleSystemInfoPanel()}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                        <Typography className={classes.expansionTypography} >System Information</Typography>
                    </ExpansionPanelSummary>
                    {
                        isSystemInfoPanelOpen &&
                            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                                <Show className={classes.showDetails} title={pageTitle} {...rest}>
                                    <SimpleShowLayout className={classes.showLayoutDetails}>
                                        <TextField className={classes.labelBlock} label="Source" source="source" />
                                    </SimpleShowLayout>
                                </Show>
                            </ExpansionPanelDetails>
                    }
                </ExpansionPanel>
                {
                    hasEmergencySummaryPanel && <EmergencySummaryPanel {...this.props} />
                }
            </Grid>
        );
    }
}

export default withStyles(styles)(ShowTemplate);