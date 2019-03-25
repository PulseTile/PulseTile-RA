import React, { Component } from "react";
import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import EditButton from "../../common/Buttons/EditButton";

const styles = theme => ({
    showBlock: {
        width: '100%',
        backgroundColor: "white",
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
    },
    showDetails: {
        '& > div': {
            boxShadow: "none",
        }
    },
    showLayoutDetails: {
        paddingTop: 10,
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
        currentPanel: "main",
    };

    handleChange = panel => {
        this.setState({
            currentPanel: panel,
        });
    };

    render() {
        const { classes, children, pageTitle, resourceUrl, changeViewType, ...rest } = this.props;
        const { currentPanel } = this.state;
        return (
            <Grid item xs={12} sm={6} className={classes.showBlock}>
                <ExpansionPanel className={(currentPanel === 'main') ? classes.currentExpansionPanel : classes.expansionPanel} expanded={currentPanel === 'main'} onChange={() => this.handleChange('main')}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                        <Typography className={classes.expansionTypography} >{pageTitle}</Typography>
                    </ExpansionPanelSummary>
                    {
                        (currentPanel === 'main') &&
                        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                            <Show className={classes.showDetails} title={pageTitle} {...rest}>
                                <SimpleShowLayout className={classes.showLayoutDetails}>
                                    {children}
                                </SimpleShowLayout>
                            </Show>
                            {resourceUrl === "top3Things" && <EditButton redirectTo={changeViewType} />}
                        </ExpansionPanelDetails>
                    }
                </ExpansionPanel>
                <ExpansionPanel className={(currentPanel === 'systemInfo') ? classes.currentExpansionPanel : classes.expansionPanel} expanded={currentPanel === 'systemInfo'} onChange={() => this.handleChange('systemInfo')}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                        <Typography className={classes.expansionTypography} >System Information</Typography>
                    </ExpansionPanelSummary>
                    {
                        (currentPanel === 'systemInfo') &&
                        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                            <Show className={classes.showDetails} title={pageTitle} {...rest}>
                                <SimpleShowLayout className={classes.showLayoutDetails}>
                                    <DateField className={classes.labelBlock} label="Date" source="dateCreated" />
                                    <TextField className={classes.labelBlock} label="Source" source="source" />
                                </SimpleShowLayout>
                            </Show>
                        </ExpansionPanelDetails>
                    }
                </ExpansionPanel>
            </Grid>
        );
    }
}

export default withStyles(styles)(ShowTemplate);