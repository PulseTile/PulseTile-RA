import React, { Component } from "react";
import moment from "moment";
import { connect } from 'react-redux';
import { setSidebarVisibility } from "react-admin";

import TableCell from '@material-ui/core/TableCell';

import CustomDatagridRow from "../../../common/ResourseTemplates/fragments/CustomDatagridRow";
import { DATE_FORMAT } from "../../../common/ResourseTemplates/fragments/constants";
import ViewButton from "../../../common/Buttons/ViewButton";
import ConfirmationModal from "./ConfirmationModal";
import get from "lodash/get";
import { themeCommonElements } from "../../../../version/config/theme.config";
import fetchInitialize from "../fetchInitialize";
import { currentPatientAction } from "../../../actions/currentPatientAction";
import LoadingSlider from "../../../common/LoadingSlider";

class PatientDatagridRow extends Component {

    state = {
        anchorEl: null,
        loading: false,
    };

    redirectWithoutPermission = e => {
        e.stopPropagation();
        this.redirectToSummary();
    };

    /**
     * This function redirects to Patient Summary page
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>

     */
    redirectToSummary = () => {
        const { record } = this.props;
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

    handleClick = e => {
        e.stopPropagation();
        this.setState({
            anchorEl: e.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: false,
        });
    };

    render() {
        const { classes, record } = this.props;
        const { loading, anchorEl } = this.state;

        if (!record) {
            return null;
        }

        if (loading) {
            return (
                <LoadingSlider />
            )
        }

        const isPermissionRequired = get(themeCommonElements, 'patientSummaryPermission', false);
        const open = Boolean(anchorEl);

        return (
            <CustomDatagridRow {...this.props} >
                <TableCell key={`${record.id}-name`}>
                    {record.name}
                </TableCell>
                <TableCell key={`${record.id}-address`}>
                    {record.address}
                </TableCell>
                <TableCell key={`${record.id}-birthDate`}>
                    {moment(record.birthDate).format(DATE_FORMAT)}
                </TableCell>
                <TableCell key={`${record.id}-nhsNumber`}>
                    {record.nhsNumber}
                </TableCell>
                <TableCell className={classes.viewButtonCell}>
                    <ViewButton viewAction={isPermissionRequired ? this.handleClick : this.redirectWithoutPermission} />
                </TableCell>
                <ConfirmationModal anchorEl={anchorEl} open={open} handleClose={this.handleClose} agreeAction={this.redirectToSummary} />
            </CustomDatagridRow>
        );
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

export default connect(null, mapDispatchToProps)(PatientDatagridRow);
