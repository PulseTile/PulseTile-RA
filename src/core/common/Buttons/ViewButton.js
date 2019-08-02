import React, { Component } from "react";
import get from "lodash/get";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';

import { themeCommonElements } from "../../../version/config/theme.config";
import Popover from "@material-ui/core/Popover";

const styles = theme => ({
    paper: {
        display: "block",
        width: 100,
        height: 'auto',
        margin: 0,
        padding: 10,
        borderRadius: 0,
    },
    buttomBlock: {
        display: "flex",
    },
    viewButton: {
        height: 40,
        textTransform: 'capitalize',
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        backgroundColor: theme.isOldDesign ? theme.palette.paperColor : null,
        color: theme.palette.secondaryMainColor + ' !important',
        borderRadius: 0,
        '& span p': {
            fontSize: 16,
            color: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.viewButton,
        },
    },
    arrowButton: {
        height: 40,
        paddingLeft: 0,
        paddingRight: 0,
        borderTop: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        borderRight: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        borderBottom: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        borderRadius: 0,
        color: theme.palette.secondaryMainColor,
    },
    link: {
        height: 25,
        cursor: "pointer",
        paddingTop: 5,
    }
});

/**
 * This component returns Show button with custom styles
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func}  viewAction
 * @param {shape} record
 */
class ViewButton extends Component {

    state = {
        anchorEl: null,
    };

    popoverOpen = e => {
        e.stopPropagation();
        this.setState({
            anchorEl: e.currentTarget,
        });
    };

    popoverClose = () => {
        this.setState({
            anchorEl: false,
        });
    };

    render() {
        const { classes, viewAction, checkRedirectUrl  } = this.props;
        const { anchorEl } = this.state;

        const open = Boolean(anchorEl);
        return (
            <div className={classes.buttomBlock}>
                <Button aria-label="View" onClick={e => viewAction(e)} className={classes.viewButton}>
                    <Typography>View</Typography>
                </Button>
                {
                    get(themeCommonElements, 'redirectToPlugin', false) &&
                        <React.Fragment>
                            <ArrowDownIcon className={classes.arrowButton}  onClick={e => this.popoverOpen(e)} />
                            <Popover
                                open={open}
                                classes={{ paper: classes.paper }}
                                anchorEl={anchorEl}
                                onClose={() => this.popoverClose()}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            >
                                <Typography className={classes.link} >Orders</Typography>
                                <Divider />
                                <Typography className={classes.link} >Results</Typography>
                                <Divider />
                                <Typography className={classes.link} onClick={e => checkRedirectUrl(e, '/vitalsigns')}>Vitals</Typography>
                                <Divider />
                                <Typography className={classes.link} onClick={e => checkRedirectUrl(e, '/problems')}>Problems</Typography>
                            </Popover>
                        </React.Fragment>

                }
            </div>
        );
    }
}

export default withStyles(styles)(ViewButton);