import React, { Component } from "react";
import moment from "moment";
import { connect } from 'react-redux';
import { setSidebarVisibility } from "react-admin";

import TableCell from '@material-ui/core/TableCell';

import { columnsTogglingAction } from "../../../actions/columnsTogglingAction";
import CustomDatagridRow from "../../../common/ResourseTemplates/fragments/CustomDatagridRow";
import { DATE_FORMAT } from "../../../common/ResourseTemplates/fragments/constants";
import ViewButton from "../../../common/Buttons/ViewButton";
import ConfirmationModal from "./ConfirmationModal";
import get from "lodash/get";
import { themeCommonElements } from "../../../../version/config/theme.config";
import fetchInitialize from "../fetchInitialize";
import { currentPatientAction } from "../../../actions/currentPatientAction";
import LoadingSlider from "../../../common/LoadingSlider";

// TEMPORARY
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

class PatientDatagridRow extends Component {

    state = {
        anchorEl: null,
        loading: false,
        redirectUrl: '/summary',
    };

    redirectWithoutPermission = (e, url = null) => {
        e.stopPropagation();
        this.redirectToSummary(url);
    };

    /**
     * This function redirects to Patient Summary page
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>

     */
    redirectToSummary = () => {
        const { record } = this.props;
        const { redirectUrl } = this.state;
        localStorage.setItem('patientId', record.nhsNumber);
        this.setState({
            loading: true
        });
        new Promise(fetchInitialize).then(() => {
            this.props.updateCurrentPatient(record.nhsNumber);
            this.props.history.push(redirectUrl);
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

    checkRedirectUrl = (e, value) => {
        e.stopPropagation();
        this.setState({
            redirectUrl: value,
            anchorEl: e.currentTarget,
         });
    };

    isColumnHidden = columnName => {
        const { hiddenColumns } = this.props;
        return hiddenColumns.indexOf(columnName) === -1;
    };

    render() {
        const { classes, record, hiddenColumns } = this.props;
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
                {
                    this.isColumnHidden('address') &&
                        <TableCell key={`${record.id}-address`}>
                            {record.totalAddress}
                        </TableCell>
                }
                <TableCell key={`${record.id}-gender`}>
                    {record.gender}
                </TableCell>
                <TableCell key={`${record.id}-birthDate`}>
                    {moment(record.birthDate).format(DATE_FORMAT)}
                </TableCell>
                {
                    this.isColumnHidden('nhsNumber') &&
                        <TableCell key={`${record.id}-nhsNumber`}>
                            {record.nhsNumber}
                        </TableCell>
                }

                {/*{*/}
                {/*    this.isColumnHidden('ordersDate') &&*/}
                {/*        <TableCell key={`${record.id}-ordersDate`}>*/}
                {/*            {moment(randomDate(new Date(2015, 4, 20), new Date())).format(DATE_FORMAT)}*/}
                {/*        </TableCell>*/}
                {/*}*/}
                {/*{*/}
                {/*    this.isColumnHidden('ordersCount') &&*/}
                {/*        <TableCell key={`${record.id}-ordersCount`}>*/}
                {/*            {Math.floor(Math.random() * Math.floor(8))}*/}
                {/*        </TableCell>*/}
                {/*}*/}

                {/*{*/}
                {/*    this.isColumnHidden('resultsDate') &&*/}
                {/*        <TableCell key={`${record.id}-resultsDate`}>*/}
                {/*            {moment(randomDate(new Date(2015, 4, 20), new Date())).format(DATE_FORMAT)}*/}
                {/*        </TableCell>*/}
                {/*}*/}
                {/*{*/}
                {/*    this.isColumnHidden('resultsCount') &&*/}
                {/*        <TableCell key={`${record.id}-resultsCount`}>*/}
                {/*            {Math.floor(Math.random() * Math.floor(12))}*/}
                {/*        </TableCell>*/}
                {/*}*/}

                {
                    this.isColumnHidden('vitalsDate') &&
                        <TableCell key={`${record.id}-vitalsDate`} onClick={e => this.checkRedirectUrl(e, '/vitalsigns')}>
                            {moment(randomDate(new Date(2015, 4, 20), new Date())).format(DATE_FORMAT)}
                        </TableCell>
                }
                {
                    this.isColumnHidden('vitalsCount') &&
                        <TableCell key={`${record.id}-vitalsCount`} onClick={e => this.checkRedirectUrl(e, '/vitalsigns')}>
                            {Math.floor(Math.random() * Math.floor(12))}
                        </TableCell>
                }

                {
                    this.isColumnHidden('problemsDate') &&
                        <TableCell key={`${record.id}-problemsDate`} onClick={e => this.checkRedirectUrl(e, '/problems')}>
                            {moment(randomDate(new Date(2015, 4, 20), new Date())).format(DATE_FORMAT)}
                        </TableCell>
                }
                {
                    this.isColumnHidden('problemsCount') &&
                        <TableCell key={`${record.id}-problemsCount`} onClick={e => this.checkRedirectUrl(e, '/problems')}>
                            {Math.floor(Math.random() * Math.floor(12))}
                        </TableCell>
                }

                <TableCell className={classes.viewButtonCell}>
                    <ViewButton viewAction={isPermissionRequired ? this.handleClick : this.redirectWithoutPermission} checkRedirectUrl={this.checkRedirectUrl} />
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
        removeHiddenColumns() {
            dispatch(columnsTogglingAction.remove());
        }
    }
};

export default connect(null, mapDispatchToProps)(PatientDatagridRow);
