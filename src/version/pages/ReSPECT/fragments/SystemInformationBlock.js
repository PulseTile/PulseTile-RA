import React from "react";
import get from "lodash/get";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
    textField: {
        display: 'block',
    }
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
                        <CardContent>
                            <TextField className={classes.textField} label="Source" defaultValue={get(info, 'source', null)} disabled={true}/>
                            <TextField className={classes.textField} label="Author" defaultValue={get(info, 'author', null)} disabled={true}/>
                        </CardContent>
                    </ExpansionPanelDetails>
            }
        </ExpansionPanel>
    );
};

export default withStyles(styles)(SystemInformationBlock);
