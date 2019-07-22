import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import PageTitle from "../../../../core/common/Topbar/fragments/PageTitle";
import PatientBanner from "../../../../core/common/Topbar/fragments/PatientBanner";
import MobileMenu from "./MobileMenu";

import { currentPatientAction } from "../../../../core/actions/currentPatientAction";

const styles = theme => ({
    lowPart: {
        display: "flex",
        minHeight: "auto",
        flexDirection: "column",
        padding: 0,
    },
    menuAndBanner: {
        [theme.breakpoints.down('sm')]: {
            display: "none",
        },
        display: "flex",
        width: "100%",
        minHeight: "auto",
        border: `1px solid ${theme.palette.borderColor}`,
        padding: 0,
        backgroundColor: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.paperColor,
        justifyContent: "space-between",
    },
    menuButtonBlock: {
        display: "inline-flex",
        position: "relative",
        minWidth: 238,
        minHeight: 90,
        borderRight: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : `1px solid ${theme.palette.borderColor}`,
        justifyContent: "center",
        alignItems: "center",
    },
    menuButton: {
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        minWidth: 64,
        color: theme.palette.fontColor,
        textTransform: "none",
        backgroundColor: theme.palette.tableHeadColor,
        fontSize: 16,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: theme.isOldDesign ? theme.palette.paperColor : theme.palette.secondaryMainColor,
            color: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.paperColor,
        },
        '&:active': {
            backgroundColor: theme.isOldDesign ? theme.palette.paperColor : theme.palette.secondaryMainColor,
            color: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.paperColor,
        },
    },
    title: {
        display: "block",
        width: "100%",
        flexGrow: 1,
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: 800,
    },
    patientInfo: {
        color: theme.isOldDesign ?  theme.palette.paperColor :  theme.palette.fontColor,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 14,
        paddingRight: 14,
        margin: 0,
    },
    gridBlock: {
        padding: "0px !important",
    },
    patientNameBlock: {
        marginBottom: 5,
    },
    keyName: {
        color: theme.isOldDesign ?  theme.palette.paperColor :  theme.palette.fontColor,
    }
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

/**
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} location
 * @return {boolean}
 */
export function pageHasTitle(location) {
    const pathName = location.pathname;
    const pagesWithTitle = [
        '/charts',
    ];
    return pagesWithTitle.indexOf(pathName) !== -1;
}

/**
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} location
 * @return {boolean}
 */
export function pageHasPatientBanner(location) {
    const pathName = location.pathname;
    const pathArray = pathName.split('/');
    const currentResource = get(pathArray, [1], null);
    const pagesWithTitle = [
        'charts',
        'patients',
        'business'
    ];
    return pagesWithTitle.indexOf(currentResource) !== -1  || (pathName === '/' && localStorage.getItem('role') === 'IDCR');
}

/**
 * This component returns low part of Showcase TopBar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
class LowPart extends Component {

    componentDidMount() {
        const isPageHasPatientBanner = pageHasPatientBanner(this.props.location);
        if (!isPageHasPatientBanner && localStorage.getItem('patientId')) {
            this.props.getCurrentPatientAction();
        }
    }

    componentWillMount() {
        this.props.setSidebarVisibility(true);
    }

    render() {
        const { classes, isSidebarOpen, setSidebarVisibility, location, patientInfo } = this.props;
        const isPageHasTitle = pageHasTitle(location);
        const isPageHasPatientBanner = pageHasPatientBanner(location);
        return (
            <Toolbar className={classes.lowPart}>
                {
                    isPageHasTitle &&
                    <PageTitle classes={classes} location={location} />
                }
                <div className={classes.menuAndBanner}>
                    <MenuButton classes={classes} setSidebarVisibility={setSidebarVisibility} isSidebarOpen={isSidebarOpen} />
                    {
                        !isPageHasPatientBanner &&
                        <PatientBanner location={location} classes={classes} patientInfo={patientInfo} />
                    }
                </div>
                <MobileMenu
                    isPageHasPatientBanner={isPageHasPatientBanner}
                    setSidebarVisibility={setSidebarVisibility}
                    isSidebarOpen={isSidebarOpen}
                    patientInfo={patientInfo}
                />
            </Toolbar>
        );
    }

};

const mapStateToProps = state => {
    return {
        patientInfo: get(state, 'custom.currentPatient.patientInfo.data', null),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentPatientAction() {
            dispatch(currentPatientAction.request());
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LowPart));