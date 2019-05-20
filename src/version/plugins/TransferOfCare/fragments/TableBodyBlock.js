import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import CleanIcon from '@material-ui/icons/HighlightOff';
import Tooltip from "@material-ui/core/Tooltip";

import PopoverWithDetails from "./PopoverWithDetails";
import {transferOfCareAction} from "../../../actions/transferOfCareAction";

const styles = theme => ({
    icon: {
        color: theme.palette.dangerColor,
    },
});

class TableBodyBlock extends Component {

    state = {
        anchorEl: null,
        popoverItem: null,
    };

    handlePopoverOpen = (event, item) => {
        this.setState({
            anchorEl: event.currentTarget,
            popoverItem: item,
        });
    };

    handlePopoverClose = () => {
        this.setState({
            anchorEl: null,
            popoverItem: null,
        });
    };

    render() {
        const { classes, removeItem, list, details, loadingDetails } = this.props;
        const { anchorEl, popoverItem } = this.state;
        return (
            <TableBody>
                {
                    list.map((item, key) => {
                        return (
                            <React.Fragment>
                                <TableRow key={key} onMouseEnter={e => this.handlePopoverOpen(e, item)} onMouseLeave={this.handlePopoverClose}>
                                    <TableCell scope="row" padding="none">
                                        <Typography>{item.name}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>{item.type}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>{item.date}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>{item.source}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Clean Search" disableHoverListener={true}>
                                            <IconButton
                                                className={classes.icon}
                                                aria-haspopup="true"
                                                color="inherit"
                                                onClick={() => removeItem(item.sourceId)}
                                            >
                                                <CleanIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                                <PopoverWithDetails
                                    anchorEl={anchorEl}
                                    handlePopoverClose={this.handlePopoverClose}
                                    popoverItem={popoverItem}
                                    details={details}
                                    loadingDetails={loadingDetails}
                                />
                            </React.Fragment>

                        )
                    })
                }
            </TableBody>
        );
    }
};

const mapStateToProps = state => {
    return {
        details: get(state, 'custom.transferOfCare.details', []),
        loadingDetails: get(state, 'custom.transferOfCare.loadingDetails', false),
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(TableBodyBlock));