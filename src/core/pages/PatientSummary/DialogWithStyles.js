import React, { Component } from "react";
import get from "lodash/get";
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { showModeAction } from "../../actions/showModeAction";
import { showHeadingsAction } from "../../actions/showHeadingsAction";
import { synopsisData, showModesArray, SHOW_ALL, getHeadingsLists } from "./config";
import { themeCommonElements } from "../../../version/config/theme.config";

const styles = theme => ({
    dialogBlock: {
        [theme.breakpoints.only('xs')]: {
            paddingTop: 0,
            paddingLeft: 20,
            paddingRight: 20,
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: 300,
            minWidth: 500,
            marginTop: 5,
            marginLeft: 20,
            marginBottom: 20,
        },
    },
    dialogItem: {
        minHeight: 100,
        paddingBottom: 10,
    },
    dialogItemColumn: {
        display: "flex",
        flexDirection: "column",
    },
    dialogLabel: {
        display: "inline-block",
        minWidth: 200,
        marginTop: 10,
    },
    checkbox: {
        display: "inline-block",
        height: 24,
    },
    checkboxLabel: {
        display: "inline-block",
    },
    sectionTitle: {
        marginTop: 10,
    },
    topPanel: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    closeIcon: {
        float: "right",
        height: 25,
    },
    radio: {
        '&$checked': {
            color: theme.palette.mainColor,
        }
    },
    checked: {}
});

/**
 * This component returns content and functionality of dialog window
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class DialogContent extends Component {

    state = {
        selectedMode: this.props.showMode ? this.props.showMode : SHOW_ALL,
        selectedHeadings: this.props.showHeadings ? Object.values(this.props.showHeadings) : getHeadingsLists(),
    };

    /**
     * This function checks is current heading was checked
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {string} itemName
     * @return {boolean}
     */
    isHeadingChecked = itemName => {
        const { selectedHeadings } = this.state;
        return Object.values(selectedHeadings).indexOf(itemName) !== -1;
    };

    /**
     * This function saves headings to select
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {string} itemName
     */
    toggleVisibility = itemName => {
        this.setState(state => {
            const { selectedHeadings } = state;
            let headingsArray = selectedHeadings;
            if (Object.values(selectedHeadings).indexOf(itemName) !== -1) {
                let index = headingsArray.indexOf(itemName);
                headingsArray.splice(index, 1)
            } else {
                headingsArray.push(itemName);
            }
            return {
                selectedHeadings: headingsArray,
            };
        }, () => this.props.setHeadingsAction(this.state.selectedHeadings));
    };

    /**
     * This function toggle shows mode
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {string} mode
     */
    selectShowMode = mode => {
        this.setState(
            { selectedMode: mode },
            () => this.props.setModeAction(mode)
        );
    };

    render() {
        const { classes, onClose, showMode, ...rest } = this.props;
        const { selectedMode, selectedHeadings } = this.state;
        const FeedSelector = get(themeCommonElements, 'feedsSelectors', false);
        const hasRespectPlugin = get(themeCommonElements, 'respectPanel', false);
        return (
            <Dialog onBackdropClick={() => onClose()} {...rest}>
                <div className={classes.dialogBlock} >
                    <Tooltip title="Settings">
                        <IconButton className={classes.closeIcon} color="inherit" onClick={() => onClose()}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography className={classes.sectionTitle}>SHOW</Typography>
                    <Divider />
                    <div className={classes.dialogItem}>
                        {
                            synopsisData.map((item, key) => {
                                if (get(item, 'isSynopsis', false)) {
                                    return (
                                        <div key={key} className={classes.dialogLabel}>
                                            <Checkbox
                                                className={classes.checkbox}
                                                checked={this.isHeadingChecked(item.list)}
                                                color="primary"
                                                onChange={() => this.toggleVisibility(item.list)}
                                                classes={{root: classes.radio, checked: classes.checked}}
                                            />
                                            <Typography className={classes.checkboxLabel}>{item.title}</Typography>
                                        </div>
                                    );
                                }
                            })
                        }
                        { hasRespectPlugin &&
                            <div className={classes.dialogLabel}>
                                <Checkbox
                                    className={classes.checkbox}
                                    checked={this.isHeadingChecked('respect')}
                                    color="primary"
                                    onChange={() => this.toggleVisibility('respect')}
                                    classes={{ root: classes.radio, checked: classes.checked }}
                                />
                                <Typography className={classes.checkboxLabel}>ReSPECT</Typography>
                            </div>
                        }
                    </div>
                    { FeedSelector && <FeedSelector classes={classes} /> }
                    <Typography>VIEW OF BOARDS</Typography>
                    <Divider />
                    <div className={classes.dialogItemColumn}>
                    {
                        showModesArray.map((item, key) => {
                            return (
                                <label key={key} className={classes.dialogLabel}>
                                    <Radio
                                        className={classes.checkbox}
                                        checked={selectedMode === item.type}
                                        color="primary"
                                        onChange={() => this.selectShowMode(item.type)}
                                        classes={{ root: classes.radio, checked: classes.checked }}
                                    />
                                    <Typography className={classes.checkboxLabel}>{item.label}</Typography>
                                </label>
                            );
                        })
                    }
                    </div>
                </div>
            </Dialog>
        );
    }
};

const mapStateToProps = state => {
    return {
        showMode: get(state, 'custom.showMode.data', null),
        showHeadings: get(state, 'custom.showHeadings.data', null),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setModeAction(mode) {
            dispatch(showModeAction.request(mode));
        },
        setHeadingsAction(headingsArray) {
            dispatch(showHeadingsAction.request(headingsArray));
        }
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(withMobileDialog({breakpoint: 'xs'})(DialogContent));