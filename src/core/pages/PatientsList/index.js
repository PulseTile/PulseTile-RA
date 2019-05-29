import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';
import { TextField, DateField, ShowButton, setSidebarVisibility } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";

import { currentPatientAction } from "../../actions/currentPatientAction";
import image from "../../../version/images/pulsetile-logo.png";
import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import ViewButton from "../../common/Buttons/ViewButton";
import LoadingSlider from "../../common/LoadingSlider";
import PatientCreate from "./PatientCreate";
import PatientEdit from "./PatientEdit";
import PatientShow from "./PatientShow";
import fetchInitialize from "./fetchInitialize";
import ConfirmationModal from "./fragments/ConfirmationModal";
import { themeCommonElements } from "../../../version/config/theme.config";

const styles = theme => ({
    content: {
        width: "100%",
        height: "100%",
        backgroundImage: theme.patientSummaryPanel.container.background,
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    imageBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "10%",
    },
    image: {
        width: "30%",
        height: "30%",
    },
});

/**
 * This component returns block with Patients list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
class PatientsList extends Component {

    state = {
        loading: false,
        anchorEl: null,
        record: null,
    };

    componentDidMount() {
        this.props.setSidebarVisibility(false);
    }

    redirectWithoutPermission = (e, record) => {
        e.stopPropagation();
        this.setState({
            record: record
        }, () => this.redirectToSummary());
    };

    /**
     * This function redirects to Patient Summary page
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>

     */
    redirectToSummary = () => {
        const { record } = this.state;
        localStorage.setItem('patientId', record.nhsNumber);
        this.setState({
            loading: true
        });
        new Promise(fetchInitialize).then(() => {
            this.props.updateCurrentPatient(record.nhsNumber);
            this.props.history.push('/summary');
            this.props.setSidebarVisibility(true);
            this.setState({
                loading: false
            })
        });
    };

    handleClick = (e, record) => {
        e.stopPropagation();
        this.setState({
            anchorEl: e.currentTarget,
            record: record
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: false,
        });
    };

    render() {
        const { userSearch, classes } = this.props;
        const { loading, anchorEl } = this.state;
        const isPermissionRequired = get(themeCommonElements, 'patientSummaryPermission', false);
        const open = Boolean(anchorEl);
        if (!userSearch) {
            return (
                <div className={classes.content}>
                    <div className={classes.imageBlock} >
                        <CardMedia
                            className={classes.image}
                            component="img"
                            alt="NHS Scotland"
                            image={image}
                        />
                    </div>
                </div>
            )
        }

        if (loading) {
            return (
                <LoadingSlider />
            )
        }

        return (
            <React.Fragment>
                <ListTemplate
                    basePath="/patients"
                    create={PatientCreate}
                    edit={PatientEdit}
                    show={PatientShow}
                    resourceUrl="patients"
                    title="Patients List"
                    headerFilterAbsent={true}
                    {...this.props}
                >
                    <TextField source="name" label="Name"/>
                    <TextField source="address" label="Address"/>
                    <DateField source="birthDate" label="Born"/>
                    <TextField source="nhsNumber" label="NHS No."/>
                    <ViewButton viewAction={isPermissionRequired ? this.handleClick : this.redirectWithoutPermission}/>
                </ListTemplate>
                <ConfirmationModal anchorEl={anchorEl} open={open} handleClose={this.handleClose} agreeAction={this.redirectToSummary} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userSearch: state.custom.userSearch.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateCurrentPatient(data) {
            dispatch(currentPatientAction.request(data));
        },
        setSidebarVisibility(params) {
            dispatch(setSidebarVisibility(params));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientsList));