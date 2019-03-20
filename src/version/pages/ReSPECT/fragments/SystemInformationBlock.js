import React, { Component } from "react";
import get from "lodash/get";
import { Control } from 'react-redux-form';

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

class SystemInformationBlock extends Component {

    state = {
        isOpen: true,
    };

    togglePanel = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    render() {
        const { classes, modelName, filledValues } = this.props;
        const { isOpen } = this.state;
        return (
            <ExpansionPanel className={isOpen ? classes.currentExpansionPanel : classes.expansionPanel} expanded={isOpen} onChange={() => this.togglePanel()}>
                <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                    <Typography className={classes.title}>System Information</Typography>
                </ExpansionPanelSummary>
                {
                    isOpen &&
                        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                            <FormGroup className={classes.formGroup}>
                                <FormLabel className={classes.mainFormLabel}>Source</FormLabel>
                                <Control.text
                                    className={classes.formInput}
                                    model={modelName + '.source'}
                                    defaultValue={get(filledValues, 'source', null)}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup className={classes.formGroup}>
                                <FormLabel className={classes.mainFormLabel}>Author</FormLabel>
                                <Control.text
                                    className={classes.formInput}
                                    model={modelName + '.author'}
                                    defaultValue={get(filledValues, 'author', null)}
                                    disabled
                                />
                            </FormGroup>
                        </ExpansionPanelDetails>
                }
            </ExpansionPanel>
        );
    }
};

export default withStyles(styles)(SystemInformationBlock);
