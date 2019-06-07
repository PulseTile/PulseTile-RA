import React, { Component } from "react";
import moment from "moment";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import ModalWindow from "./ModalWindow";
import { getAuthorName } from "../../functions";
import { DATE_FORMAT } from "../../statuses";

const styles = theme => ({
    rowInProgress: {
        '&:hover p': {
            color: "#fff",
        },
    },
    editButton: {
        color: theme.palette.mainColor,
        fontSize: 16,
        height: 40,
    }
});

class NewVersionRow extends Component {

    state = {
        isOpenModal: this.props.respectModal,
    };

    toggleMode = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        });
    };

    render() {
        const { classes, versionsNumber, toggleMode } = this.props;
        const { isOpenModal } = this.state;
        return (
            <React.Fragment>
                <ModalWindow open={isOpenModal} onClose={this.toggleMode} toggleMode={toggleMode} />
                <TableRow className={classes.rowInProgress}>
                    <TableCell scope="row" padding="none">
                        <Typography>{versionsNumber}</Typography>
                    </TableCell>
                    <TableCell scope="row" padding="none">
                        <Typography>{moment().format(DATE_FORMAT)}</Typography>
                    </TableCell>
                    <TableCell scope="row" padding="none">
                        <Typography>{moment().format('HH:mm')}</Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Tooltip title="Proceed" disableHoverListener={true}>
                            <IconButton className={classes.editButton} onClick={() => this.toggleMode()}>
                                Latest
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                        <Typography>{getAuthorName()}</Typography>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

};

const mapStateToProps = state => {
    return {
        respectModal: state.custom.respectModal.data,
        versionsServerInfo: state.custom.versionsServerInfo.data,
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(NewVersionRow));
