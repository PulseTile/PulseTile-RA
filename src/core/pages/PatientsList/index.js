import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';
import { TextField, DateField, setSidebarVisibility } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TodayIcon from "@material-ui/icons/Today";
import CheckIcon from "@material-ui/icons/Check";

import { patientsCountAction } from "../../actions/patientsCountAction";
import image from "../../../version/images/pulsetile-logo.png";
import PatientListTemplate from "./templates/PatientListTemplate";
import ViewButton from "../../common/Buttons/ViewButton";
import PatientCreate from "./PatientCreate";
import PatientEdit from "./PatientEdit";
import PatientShow from "./PatientShow";
import DatagridRow from "./fragments/DatagridRow";
import ColumnsTogglingPopover from "./fragments/ColumnsTogglingPopover";
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
    labelWithIcon: {
        marginBottom: 10,
    },
    icon: {
        marginTop: 5,
        marginLeft: 5,
    },
});

const LabelWithIcon = ({ classes, title, icon }) => {
    return (
        <Typography className={classes.labelWithIcon}  variant="h1">{ title }{ icon }</Typography>
    )
};

const defaultHiddenColumns = [
    'ordersDate', 'resultsDate', 'vitalsDate', 'problemsDate',
    'ordersCount', 'resultsCount', 'vitalsCount', 'problemsCount'
];

/**
 * This component returns block with Patients list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
class PatientsList extends Component {

    state = {
        key: 0,
    };

    componentDidMount() {
        this.props.setSidebarVisibility(false);
    }

    componentWillReceiveProps(newProps, prevList) {
        const { getPatientsCounts } = this.props;

        const prevPatientsIds = get(prevList, 'patientsIds', []);
        const newPatientsIds = get(newProps, 'patientsIds', []);
        const isPatientListCount = get(themeCommonElements, 'isPatientListCount', false);

        // if (isPatientListCount && (prevPatientsIds !== newPatientsIds) && newPatientsIds.length > 0) {
        //     newPatientsIds.map(item => {
        //         getPatientsCounts(item);
        //     });
        // }
    }

    updateTableHead = () => {
        this.setState({
            key: this.state.key + 1,
        })
    };

    isColumnHidden = columnName => {
        const { hiddenColumns } = this.props;
        return hiddenColumns.indexOf(columnName) === -1;
    };

    render() {
        const { userSearch, userSearchID, userSearchType, userClinicalQuery, userSearchValue, classes } = this.props;

        if (!userSearch && !userSearchID && !userSearchType && !userSearchValue && !userClinicalQuery) {
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


        return (
            <React.Fragment>
                <PatientListTemplate
                    basePath="/patients"
                    create={PatientCreate}
                    edit={PatientEdit}
                    show={PatientShow}
                    resourceUrl="patients"
                    title="Patients List"
                    headerFilterAbsent={true}
                    CustomRow={DatagridRow}
                    isCustomDatagrid={true}
                    ColumnsTogglingPopover={ColumnsTogglingPopover}
                    hasColumnsToggling={get(themeCommonElements, 'patientListColumnToggling', false)}
                    updateTableHead={this.updateTableHead}
                    defaultHiddenColumns={defaultHiddenColumns}
                    {...this.props}
                >
                    <TextField source="name" label="Name"/>
                    { this.isColumnHidden('address') && <TextField source="totalAddress" label="Address" /> }
                    <TextField source="gender" label="Gender"/>
                    <DateField source="birthDate" label="Born"/>
                    { this.isColumnHidden('nhsNumber') && <TextField source="nhsNumber" label="NHS No." /> }

                    {/*{ this.isColumnHidden('ordersDate') &&*/}
                    {/*    <DateField source="ordersDate" label={<LabelWithIcon classes={classes} title="Orders" icon={<TodayIcon className={classes.icon}/>}/>} />*/}
                    {/*}*/}
                    {/*{ this.isColumnHidden('ordersCount') &&*/}
                    {/*    <DateField source="ordersCount" label={<LabelWithIcon classes={classes} title="Orders" icon={<CheckIcon className={classes.icon}/>}/>} />*/}
                    {/*}*/}
                    {/*{ this.isColumnHidden('resultsDate') &&*/}
                    {/*    <DateField source="resultsDate" label={<LabelWithIcon classes={classes} title="Results" icon={<TodayIcon className={classes.icon} />} />} />*/}
                    {/*}*/}
                    {/*{ this.isColumnHidden('resultsCount') &&*/}
                    {/*    <DateField source="resultsCount" label={<LabelWithIcon classes={classes} title="Results" icon={<CheckIcon className={classes.icon} />} />} />*/}
                    {/*}*/}

                    { this.isColumnHidden('vitalsDate')  &&
                        <DateField source="vitalsDate" label={<LabelWithIcon classes={classes} title="Vitals" icon={<TodayIcon className={classes.icon} />} />} />
                    }

                    { this.isColumnHidden('vitalsCount') &&
                        <DateField source="vitalsCount" label={<LabelWithIcon classes={classes} title="Vitals" icon={<CheckIcon className={classes.icon}/>}/>} />
                    }

                    { this.isColumnHidden('problemsDate') &&
                        <DateField source="problemsDate" label={<LabelWithIcon classes={classes} title="Problems" icon={<TodayIcon className={classes.icon} />} />}/>
                    }

                    { this.isColumnHidden('problemsCount') &&
                        <DateField source="problemsCount" label={<LabelWithIcon classes={classes} title="Problems" icon={<CheckIcon className={classes.icon} />} />} />
                    }

                    <ViewButton />

                </PatientListTemplate>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userSearch: get(state, 'custom.userSearch.data', null),
        userSearchID: get(state, 'custom.userSearch.id', null),
        userSearchType: get(state, 'custom.userSearch.type', null),
        userSearchValue: get(state, 'custom.userSearch.value', null),
        userClinicalQuery: get(state, 'custom.clinicalQuery.data', null),
        hiddenColumns:  get(state, 'custom.toggleColumns.data.patients', []),
        patientsIds: get(state, 'admin.resources.patients.list.ids', []),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSidebarVisibility(params) {
            dispatch(setSidebarVisibility(params));
        },
        getPatientsCounts(patientId) {
            dispatch(patientsCountAction.request(patientId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientsList));