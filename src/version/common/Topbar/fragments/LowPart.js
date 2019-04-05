import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import { pageHasTitle } from "../../../../core/common/Topbar/functions";
import PageTitle from "../../../../core/common/Topbar/fragments/PageTitle";
import PatientBanner from "../../../../core/common/Topbar/fragments/PatientBanner";

const styles = theme => ({
    lowPart: {
        display: "flex",
        minHeight: "auto",
        flexDirection: "column",
        padding: 0,
    },
    menuAndBanner: {
        [theme.breakpoints.only('xs')]: {
            display: "none",
        },
        display: "flex",
        width: "100%",
        minHeight: "auto",
        border: `1px solid ${theme.palette.borderColor}`,
        padding: 0,
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    menuAndBannerMobile: {
        display: "flex",
        width: "100%",
        minHeight: "auto",
        flexDirection: "row",
        padding: 0,
        justifyContent: "space-between",
        backgroundColor: theme.palette.paperColor,
    },
    menuButtonBlock: {
        display: "inline-flex",
        position: "relative",
        minWidth: 238,
        minHeight: 90,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        justifyContent: "center",
        alignItems: "center",
    },
    mobileMenuButton: {
        color: theme.palette.mainColor,
    },
    iconArrowDown: {
        color: theme.palette.fontColor,
        paddingTop: 15,
        paddingRight: 15,
    },
    patientBannerMobile: {
        backgroundColor: theme.palette.paperColor,
        width: "100%",
        minHeight: "auto",
        '& span': {
            color: theme.palette.fontColor,
        },
    },
    bannerRow: {
        marginBottom: 5,
    },
    menuButton: {
        borderRadius: 15,
        minWidth: 64,
        color: theme.palette.mainColor,
        textTransform: "none",
        backgroundColor: "white",
        '&:hover': {
            backgroundColor: theme.palette.mainColor,
            color: "white",
        },
        '&:active': {
            backgroundColor: theme.palette.mainColor,
            color: "white",
        },
    },
    title: {
        display: "block",
        width: "100%",
        flexGrow: 1,
        color: "white",
        backgroundColor: theme.palette.mainColor,
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: 800,
    },
    patientInfo: {
        color: "black",
        padding: "11px 14px",
        marginLeft: 5,
    },
    gridBlock: {
        padding: "0px !important",
        marginTop: 5,
        marginBottom: 5,
    },
});

/**
 * This component returns button which toggle sidebar menu
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   classes
 * @param {func}    setSidebarVisibility
 * @param {boolean} isSidebarOpen
 * @constructor
 */
const MenuButton = ({ classes, setSidebarVisibility, isSidebarOpen }) => {
    return (
        <div className={classes.menuButtonBlock}>
            <Button aria-label={!isSidebarOpen ? 'Menu' : 'Close'} variant="contained" color="primary" className={classes.menuButton} onClick={() => setSidebarVisibility(!isSidebarOpen)}>
                { !isSidebarOpen ? <MenuIcon /> : <CloseIcon /> }
                { !isSidebarOpen ? 'Menu' : 'Close' }
            </Button>
        </div>
    );
};

const MenuButtonMobile = ({ classes, setSidebarVisibility, isSidebarOpen }) => (
    <Tooltip title={!isSidebarOpen ? 'Menu' : 'Close'}>
        <IconButton
            className={classes.mobileMenuButton}
            aria-haspopup="true"
            color="inherit"
            onClick={() => setSidebarVisibility(!isSidebarOpen)}
            aria-label={!isSidebarOpen ? 'Menu' : 'Close'}
        >
            { !isSidebarOpen ? <MenuIcon /> : <CloseIcon /> }
        </IconButton>
    </Tooltip>
);



/**
 * This component returns low part of Showcase TopBar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
class LowPart extends Component {

    state = {
        isMobileBannerOpened: false,
    };

    componentWillMount() {
        this.props.setSidebarVisibility(true);
    }

    toggleMobileBanner = () => {
        this.setState({
            isMobileBannerOpened: !this.state.isMobileBannerOpened,
        });
    };

    render() {
        const { classes, isSidebarOpen, setSidebarVisibility, location, patientInfo } = this.props;
        const { isMobileBannerOpened } = this.state;
        const isPageHasTitle = pageHasTitle(location);
        return (
            <Toolbar className={classes.lowPart}>
                {
                    isPageHasTitle &&
                        <PageTitle classes={classes} location={location} />
                }
                <div className={classes.menuAndBanner}>
                    <MenuButton classes={classes} setSidebarVisibility={setSidebarVisibility} isSidebarOpen={isSidebarOpen} />
                    {
                        !isPageHasTitle &&
                            <PatientBanner location={location} classes={classes} patientInfo={patientInfo} />
                    }
                </div>
                <div className={classes.menuAndBannerMobile}>
                    <MenuButtonMobile classes={classes} setSidebarVisibility={setSidebarVisibility} isSidebarOpen={isSidebarOpen} />
                    <Typography variant="h6">{get(patientInfo, 'name', null)}</Typography>
                    <FontAwesomeIcon icon={faSortDown} size="1x" className={classes.iconArrowDown} onClick={() => this.toggleMobileBanner()} />
                </div>
                { isMobileBannerOpened &&
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
            </Toolbar>
        );
    }

};

export default withStyles(styles)(LowPart);
