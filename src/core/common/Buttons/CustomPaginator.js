import React, { Component } from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';

import { ITEMS_PER_PAGE, MAIN_COLOR } from "../../config/styles";

const styles = {
    paginatorRoot: {
        display: "flex",
        flexDirection: "row",
    },
    button: {
        display: "block",
        border: "1px solid #e5e5e5",
        height: "100%",
        width: "35px !important",
        borderRadius: 0,
        color: MAIN_COLOR,
        '&:hover': {
            color: "white",
            backgroundColor: MAIN_COLOR
        }
    },
    activeButton: {
        display: "block",
        border: "1px solid #e5e5e5",
        height: "100%",
        width: "35px !important",
        borderRadius: 0,
        color: "white",
        backgroundColor: MAIN_COLOR,
        '&:hover': {
            color: "white",
            backgroundColor: MAIN_COLOR
        }
    }
};

/**
 * This component returns custom paginator
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class CustomPaginator extends Component {

    state = {
        page: 1,
    };

    /**
     * This function adds page parameter to URL
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {number} page
     */
    goToPage = page => {
        this.setState(
            { page: page },
            () => {
                const { resourceUrl, history } = this.props;
                const { page} = this.state;
                history.push("/" + resourceUrl + "?page=" + page + "&perPage=" + ITEMS_PER_PAGE)
            }
        );
    };

    render() {
        const { classes, rowsNumber } = this.props;
        const { page } = this.state;
        const buttonsNumber = Math.ceil(rowsNumber / ITEMS_PER_PAGE);
        let buttons = [];
        for (let i = 0; i < buttonsNumber; i++) {
            buttons.push(
                <Button
                  onClick={() => this.goToPage(i + 1)}
                  className={(page === i + 1) ? classes.activeButton : classes.button}>
                    { i + 1 }
                </Button>);
        }
        return (
            <div className={classes.paginatorRoot}>
                <IconButton onClick={() => this.goToPage(1)} className={classes.button} disabled={page === 1}>
                    <FirstPageIcon />
                </IconButton>
                <IconButton onClick={() => this.goToPage(page - 1)} className={classes.button} disabled={page === 1}>
                    <KeyboardArrowLeft />
                </IconButton>
                { buttons }
                <IconButton onClick={() => this.goToPage(page + 1)} className={classes.button} disabled={page === buttonsNumber}>
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton onClick={() => this.goToPage(buttonsNumber)} className={classes.button} disabled={page === buttonsNumber}>
                   <LastPageIcon />
                </IconButton>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    const currentResource = ownProps.resourceUrl;
    return {
        rowsNumber: state.admin.resources[currentResource].list.total,
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null)
)(CustomPaginator);