import React from "react";
import get from "lodash/get";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
    textField: {
        display: 'block',
    },
    formGroup: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    mainFormLabel: {
        display: "block",
        fontWeight: 800,
        color: "#000",
        fontSize: 14,
        marginBottom: 5,
    },
};

const SystemInformationBlock = ({ classes, isMainPanel, togglePanel, info }) => {
    return (
        <ExpansionPanel className={!isMainPanel ? classes.currentExpansionPanel : classes.expansionPanel} expanded={!isMainPanel} onChange={() => togglePanel()}>
            <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                <Typography className={classes.title}>System Information</Typography>
            </ExpansionPanelSummary>
            {
                !isMainPanel &&
                    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.mainFormLabel}>Source</FormLabel>
                            <p>{get(info, 'source', null)}</p>
                        </FormGroup>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.mainFormLabel}>Author</FormLabel>
                            <p>{get(info, 'author', null)}</p>
                        </FormGroup>
                    </ExpansionPanelDetails>
            }
        </ExpansionPanel>
    );
};

export default withStyles(styles)(SystemInformationBlock);
