import React, { Component } from "react";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

import ModalWindow from "../versions/ModalWindow";

const styles = theme => ({
    editButton: {
        display: "block",
        float: "right",
        width: 100,
        height: 40,
        margin: 8,
        padding: 0,
        backgroundColor: theme.palette.paperColor,
        color: theme.palette.secondaryMainColor,
        border: `1px solid ${theme.palette.secondaryMainColor}`,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            backgroundColor: theme.palette.secondaryMainColor,
            color: theme.palette.paperColor,
        }
    }
});

class VersionUpdateButton extends Component {

    state = {
        isOpenModal: this.props.respectModal,
    };

    toggleModalWindow = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        });
    };

    render() {
        const { classes, toggleMode } = this.props;
        const { isOpenModal } = this.state;
        return (
            <React.Fragment>
                <ModalWindow open={isOpenModal} onClose={this.toggleModalWindow} toggleMode={toggleMode} />
                <Tooltip title="Update" disableHoverListener={true}>
                    <IconButton className={classes.editButton} onClick={() => this.toggleModalWindow()}>
                        Update
                        <EditIcon />
                    </IconButton>
                </Tooltip>
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


export default connect(mapStateToProps, null)(withStyles(styles)(VersionUpdateButton));
