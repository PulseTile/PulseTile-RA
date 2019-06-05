import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import AdvancedSearchIcon from '@material-ui/icons/LineWeight';
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';

import AdvancedSearchDialog from "./AdvancedSearchDialog";
import ClinicalQueryDialog from "./ClinicalQueryDialog";

const styles = theme => ({
    paper: {
        display: "block",
        width: 300,
        height: 'auto',
        margin: 0,
        padding: 10,
        borderRadius: 0,
    },
    advancedSearchIcon: {
        color: theme.palette.secondaryMainColor,
        border: `1px solid ${theme.palette.secondaryMainColor}`,
        borderRadius: 0,
        height: 35,
        width: 60,
        marginRight: 10,
    },
    item: {
        height: 20,
        paddingTop: 10,
        cursor: "pointer",
    }
});

class AdvancedUserSearch extends Component {

    state = {
        anchorEl: null,
        isAdvancedSearchOpen: false,
        isClinicalQueryOpen: false,
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

    openBasicSearch = () => {
        this.popoverClose();
    };

    toggleAdvancedSearch = () => {
        this.setState(
            { isAdvancedSearchOpen: !this.state.isAdvancedSearchOpen },
            () => this.popoverClose()
        );
    };

    toggleClinicalQuery = () => {
        this.setState(
            { isClinicalQueryOpen: !this.state.isClinicalQueryOpen },
            () => this.popoverClose()
        );
    };

    render() {
        const { classes  } = this.props;
        const { anchorEl, isAdvancedSearchOpen, isClinicalQueryOpen } = this.state;
        const open = Boolean(anchorEl);
        return (
            <React.Fragment>
                <Tooltip title="Advanced Search">
                    <IconButton aria-label="Advanced Search" className={classes.advancedSearchIcon} onClick={e => this.popoverOpen(e)}>
                        <AdvancedSearchIcon />
                        { open ? <ArrowDownIcon /> : <ArrowUpIcon /> }
                    </IconButton>
                </Tooltip>
                <Popover
                    open={open}
                    classes={{ paper: classes.paper }}
                    anchorEl={anchorEl}
                    onClose={() => this.popoverClose()}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Typography variant="body1" className={classes.title}>SEARCH OPTIONS</Typography>
                    <Divider />
                    <Typography className={classes.item} onClick={() => this.openBasicSearch()}>Patient Search - Basic</Typography>
                    <Typography className={classes.item} onClick={() => this.toggleAdvancedSearch()}>Patient Search - Advanced</Typography>
                    <Typography className={classes.item} onClick={() => this.toggleClinicalQuery()}>Clinical Query</Typography>
                </Popover>

                <AdvancedSearchDialog isOpen={isAdvancedSearchOpen} onClose={this.toggleAdvancedSearch} />
                <ClinicalQueryDialog isOpen={isClinicalQueryOpen} onClose={this.toggleClinicalQuery} />

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AdvancedUserSearch);
