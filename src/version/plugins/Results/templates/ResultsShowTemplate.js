import React, { Component } from "react";
import get from "lodash/get";
import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import EditButton from "../../../../core/common/Buttons/EditButton";
import CustomIcon from "../../../../core/common/CustomIcon";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
    resultBlock: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
    },
    formControl: {
        display: 'flex',
        flexDirection: 'column'
    },
    formLabel: {
        display: "block",
        fontWeight: 800,
        color: "#000",
        fontSize: 14,
        marginBottom: 5,
    },
    formValue: {
        marginBottom: 10,
    }
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
        const { classes, children, isListOpened, pageTitle, labresults, id, toggleListBlock, changeViewType, ...rest } = this.props;
        const { isMainPanelOpen, isSystemInfoPanelOpen } = this.state;
        const currentItem = get(labresults, id, null);
        const resultsArray = get(currentItem, 'testResults', []);
        const resultsNumber = resultsArray.length;
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
                            <Show className={classes.showDetails} title={pageTitle} {...this.props}>
                                <SimpleShowLayout className={classes.showLayoutDetails}>
                                    {children}
                                </SimpleShowLayout>
                            </Show>
                        </ExpansionPanelDetails>
                    }
                </ExpansionPanel>
                <ExpansionPanel className={isSystemInfoPanelOpen ? classes.currentExpansionPanel : classes.expansionPanel} expanded={isSystemInfoPanelOpen} onChange={() => this.toggleSystemInfoPanel()}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                        <Typography className={classes.expansionTypography}>Results ({resultsNumber})</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                        {
                            (resultsArray.length > 0) && resultsArray.map((item, key) => {
                                return (
                                    <div className={classes.resultBlock} key={key}>
                                        <FormControl className={classes.formControl} >
                                            <FormLabel className={classes.formLabel}>Results</FormLabel>
                                            <Typography className={classes.formValue}>{item.result}</Typography>
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <FormLabel className={classes.formLabel}>Value</FormLabel>
                                            <Typography className={classes.formValue}>{item.value}</Typography>
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <FormLabel className={classes.formLabel}>Units</FormLabel>
                                            <Typography className={classes.formValue}>{item.unit}</Typography>
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <FormLabel className={classes.formLabel}>Normal range</FormLabel>
                                            <Typography className={classes.formValue}>{item.normalRange}</Typography>
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <FormLabel className={classes.formLabel}>Comment</FormLabel>
                                            <Typography className={classes.formValue}>{item.comment}</Typography>
                                        </FormControl>
                                        <Divider />
                                    </div>
                                );
                            })
                        }


                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        labresults:  get(state, 'admin.resources.labresults.data', []),
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(ShowTemplate));