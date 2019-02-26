import React from "react";

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const MainFormBlock = ({ classes, isMainPanel, togglePanel, children, title }) => {
    return (
        <ExpansionPanel className={isMainPanel ? classes.currentExpansionPanel : classes.expansionPanel} expanded={isMainPanel} onChange={() => togglePanel()}>
            <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                <Typography className={classes.title}>{title}</Typography>
            </ExpansionPanelSummary>
            {
                isMainPanel &&
                    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                        {children}
                    </ExpansionPanelDetails>
            }
        </ExpansionPanel>
    );
};

export default MainFormBlock;
