import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const MAXIMAL_BUTTONS_NUMBER = 5;

const styles = theme => ({
    paginatorRoot: {
        display: "flex",
        flexDirection: "row",
    },
    button: {
        display: "block",
        border: "1px solid #e5e5e5",
        height: "100%",
        width: "35px",
        borderRadius: 0,
        color: theme.buttons.pagination.color,
        '&:hover': {
            color: "white",
            backgroundColor: theme.buttons.pagination.backgroundColorHover
        }
    },
    activeButton: {
        display: "block",
        border: "1px solid #e5e5e5",
        height: "100%",
        width: "35px",
        borderRadius: 0,
        color: "white",
        backgroundColor: theme.buttons.pagination.backgroundColorActive,
        '&:hover': {
            color: "white",
            backgroundColor: theme.buttons.pagination.backgroundColorHover
        }
    }
});

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
                const { resourceUrl, history, itemsPerPage } = this.props;
                const { page} = this.state;
                history.push("/" + resourceUrl + "?page=" + page + "&perPage=" + itemsPerPage)
            }
        );
    };

    /**
     * This function add spaces to the button array if digit buttons number is more than maximal
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {number} buttonsNumber
     * @param {number} page
     * @param {shape} classes
     * @return {array}
     */
    getDigitButtons = (buttonsNumber, page, classes) => {
        let buttons = [];
        if (buttonsNumber > MAXIMAL_BUTTONS_NUMBER) {
            const half = Math.ceil(MAXIMAL_BUTTONS_NUMBER / 2) - 1;
            for (let i = 0; i < half; i++) {
                buttons.push(
                    <Button
                        onClick={() => this.goToPage(i + 1)}
                        className={(page === i + 1) ? classes.activeButton : classes.button}>
                        { i + 1 }
                    </Button>
                );
            }
            buttons.push(<Button className={classes.button}>{'...'}</Button>);
            for (let i = buttonsNumber - half; i < buttonsNumber; i++) {
                buttons.push(
                    <Button
                        onClick={() => this.goToPage(i + 1)}
                        className={(page === i + 1) ? classes.activeButton : classes.button}>
                        { i + 1 }
                    </Button>
                );
            }
        } else {
            for (let i = 0; i < buttonsNumber; i++) {
                buttons.push(
                <Button
                    onClick={() => this.goToPage(i + 1)}
                    className={(page === i + 1) ? classes.activeButton : classes.button}>
                    { i + 1 }
                </Button>
                );
            }
        }

        return buttons;
    };

    render() {
        const { classes, itemsPerPage, total } = this.props;
        const { page } = this.state;
        const buttonsNumber = Math.ceil(total / itemsPerPage);
        const buttons = this.getDigitButtons(buttonsNumber, page, classes);
        return (
            <div className={classes.paginatorRoot}>
                <Tooltip title="First page">
                    <IconButton onClick={() => this.goToPage(1)} className={classes.button} disabled={page === 1}>
                        <FirstPageIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Previous page">
                    <IconButton onClick={() => this.goToPage(page - 1)} className={classes.button} disabled={page === 1}>
                        <KeyboardArrowLeft />
                    </IconButton>
                </Tooltip>
                { buttons }
                <Tooltip title="Next page">
                    <IconButton onClick={() => this.goToPage(page + 1)} className={classes.button} disabled={page === buttonsNumber}>
                        <KeyboardArrowRight />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Last page">
                    <IconButton onClick={() => this.goToPage(buttonsNumber)} className={classes.button} disabled={page === buttonsNumber}>
                       <LastPageIcon />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
};

export default withStyles(styles)(CustomPaginator);