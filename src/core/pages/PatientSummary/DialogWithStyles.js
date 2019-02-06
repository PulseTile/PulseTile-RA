import React, { Component } from "react";
import { get } from "lodash";
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import Typography from "@material-ui/core/Typography";

import { showModeAction } from "../../actions/showModeAction";
import { showHeadingsAction } from "../../actions/showHeadingsAction";
import { synopsisData, showModesArray, SHOW_ALL, getHeadingsLists } from "./config";
import { themeCommonElements } from "../../../version/config/theme.config";

const styles = {
    dialogBlock: {
        minHeight: 300,
        minWidth: 500,
        margin: 20,
    },
    dialogItem: {
        minHeight: 100,
    },
    dialogItemColumn: {
        display: "flex",
        flexDirection: "column",
    },
    dialogLabel: {
        display: "inline-block",
        minWidth: 200,
    }
};

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
        const NonCoreSelectors = get(themeCommonElements, 'nonCoreSelectors', false);
        return (
            <Dialog onBackdropClick={() => onClose()} {...rest}>
                <div className={classes.dialogBlock} >
                    <Typography>SHOW</Typography>
                    <Divider />
                    <div className={classes.dialogItem}>
                        {
                            synopsisData.map((item, key) => {
                                return (
                                    <div key={key} className={classes.dialogLabel}>
                                        <Checkbox checked={this.isHeadingChecked(item.list)} color="primary" onChange={() => this.toggleVisibility(item.list)} />
                                        <span>{item.title}</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                    { NonCoreSelectors && <NonCoreSelectors classes={classes} /> }
                    <Typography>VIEW OF BOARDS</Typography>
                    <Divider />
                    <div className={classes.dialogItemColumn}>
                    {
                        showModesArray.map((item, key) => {
                            return (
                                <label key={key} className={classes.dialogLabel}>
                                    <Radio checked={selectedMode === item.type} color="primary" onChange={() => this.selectShowMode(item.type)} />
                                    <span>{item.label}</span>
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
)(DialogContent);