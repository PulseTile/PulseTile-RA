import React, { Component } from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    DateField
} from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { MAIN_COLOR } from "../../config/styles";
import EditButton from "../../common/Buttons/EditButton";

const styles = {
    showBlock: {
        width: '100%',
        backgroundColor: "white",
        margin: "15px 15px 15px 0px",
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
        backgroundColor: MAIN_COLOR,
        paddingLeft: "16px",
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
        fontSize: "18px",
        fontWeight: "700",
    },
    expansionPanelDetails: {
        display: "flex",
        flexDirection: "column",
        padding: "0px"
    },
    showDetails: {
        '& > div': {
            boxShadow: "none",
        }
    },
    showLayoutDetails: {
        paddingTop: "10px !important",
        paddingLeft: "10px !important",
    },
    labelBlock: {
        '& > div': {
            marginTop: "0px !important",
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns block with Allergies details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class AllergiesShow extends Component {

    state = {
        currentPanel: "main",
    };

    handleChange = panel => {
        this.setState({
            currentPanel: panel,
        });
    };

    render() {
        const { classes, changeViewType, ...rest } = this.props;         
        const { currentPanel } = this.state;
        return (
            <div className={classes.showBlock}>
                <ExpansionPanel className={(currentPanel === 'main') ? classes.currentExpansionPanel : classes.expansionPanel} expanded={currentPanel === 'main'} onChange={() => this.handleChange('main')}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                        <Typography className={classes.expansionTypography} >Allergy</Typography>
                    </ExpansionPanelSummary>
                    {
                        (currentPanel === 'main') &&
                            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                                <Show className={classes.showDetails} title="Allergies Details" {...rest}>
                                    <SimpleShowLayout className={classes.showLayoutDetails}>
                                        <TextField className={classes.labelBlock} source="cause" />
                                        <TextField className={classes.labelBlock} source="reaction" />
                                        <TextField className={classes.labelBlock} source="author" />
                                        <DateField className={classes.labelBlock} source="dateCreated" />
                                    </SimpleShowLayout>
                                </Show>
                                <EditButton onClickFunction={changeViewType} />
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
                                <Show className={classes.showDetails} title="Allergies Details" {...rest}>
                                    <SimpleShowLayout className={classes.showLayoutDetails}>
                                        <TextField className={classes.labelBlock} source="source" />
                                    </SimpleShowLayout>
                                </Show>
                            </ExpansionPanelDetails>
                    }
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(AllergiesShow);
