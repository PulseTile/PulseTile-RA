import React, { Component } from "react";

import get from "lodash/get";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import {pageHasPatientBanner} from "./LowPart";

const styles = theme => ({
    menuAndBannerMobile: {
        [theme.breakpoints.up('md')]: {
            display: "none",
        },
        display: "flex",
        width: "100%",
        minHeight: "auto",
        flexDirection: "row",
        padding: 0,
        justifyContent: "space-between",
        backgroundColor: theme.palette.secondaryMainColor,
    },
    menuButtonBlock: {
        display: 'flex',
        flexDirection: 'row',
        border: `1px solid ${theme.palette.paperColor}`,
        height: 34,
        margin: 7,
        borderRadius: 0,
        paddingRight: 10,
        boxSizing: 'border-box',
    },
    menuButtonTitle: {
        paddingTop: 7,
        cursor: "pointer",
    },
    mobileMenuButton: {
        color: theme.palette.paperColor,
        height: 'auto',
    },
    iconArrowDown: {
        color: theme.palette.paperColor,
        paddingTop: 15,
        paddingRight: 15,
    },
    patientBannerMobile: {
        paddingLeft: 15,
        backgroundColor: theme.palette.paperColor,
        width: "100%",
        minHeight: "auto",
        '& span': {
            color: theme.palette.paperColor,
        },
    },
    patientName: {
        paddingTop: 15,
        color: theme.palette.paperColor,
    },
    bannerRow: {
        marginBottom: 5,
    },
});

const MenuButtonMobile = ({ classes, setSidebarVisibility, isSidebarOpen }) => (
    <div className={classes.menuButtonBlock} onClick={() => setSidebarVisibility(!isSidebarOpen)}>
        <Tooltip title={isSidebarOpen ? 'Menu' : 'Close'}>
            <IconButton
                className={classes.mobileMenuButton}
                aria-haspopup="true"
                color="inherit"
                aria-label={isSidebarOpen ? 'Menu' : 'Close'}
            >
                { isSidebarOpen ? <MenuIcon /> : <CloseIcon /> }
            </IconButton>
        </Tooltip>
        <Typography variant="h1" className={classes.menuButtonTitle}>Menu</Typography>
    </div>
);

class MobileMenu extends Component {

    state = {
        isMobileBannerOpened: false,
    };

    toggleMobileBanner = () => {
        this.setState({
            isMobileBannerOpened: !this.state.isMobileBannerOpened,
        });
    };

    render() {
        const { classes, setSidebarVisibility, isSidebarOpen, patientInfo, isPageHasPatientBanner } = this.props;
        const { isMobileBannerOpened } = this.state;
        return (
            <React.Fragment>
                <div className={classes.menuAndBannerMobile}>
                    <MenuButtonMobile classes={classes} setSidebarVisibility={setSidebarVisibility} isSidebarOpen={isSidebarOpen} />
                    { !isPageHasPatientBanner && <Typography variant="h6" className={classes.patientName}>{get(patientInfo, 'name', null)}</Typography> }
                    { !isPageHasPatientBanner && <FontAwesomeIcon icon={faSortDown} size="1x" className={classes.iconArrowDown} onClick={() => this.toggleMobileBanner()} /> }
                </div>
                { (isMobileBannerOpened && !isPageHasPatientBanner) &&
                    <div className={classes.patientBannerMobile}>
                        <Typography variant="body2" className={classes.bannerRow}>
                            <span>Doctor: </span>
                            {get(patientInfo, 'gpName', null)}
                        </Typography>
                        <Typography variant="body2" className={classes.bannerRow}>
                            <span>D.O.B.: </span>
                            { moment(get(patientInfo, 'dateOfBirth', null)).format('DD-MMM-YYYY') }</Typography>
                        <Typography variant="body2" className={classes.bannerRow}>
                            <span>Phone: </span>
                            {get(patientInfo, 'phone', null)}
                        </Typography>
                        <Typography variant="body2" className={classes.bannerRow}>
                            <span>Gender: </span>
                            { get(patientInfo, 'gender', null) }
                        </Typography>
                        <Typography variant="body2" className={classes.bannerRow}>
                            <span>NHS No.: </span>
                            { get(patientInfo, 'nhsNumber', null) }</Typography>
                        <Typography variant="body2" className={classes.bannerRow}>
                            <span>Address: </span>
                            {get(patientInfo, 'address', null)}
                        </Typography>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(MobileMenu);
